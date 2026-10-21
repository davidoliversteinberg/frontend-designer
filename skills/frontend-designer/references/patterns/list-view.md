## List view

Use this pattern for a collection page where users find, filter, and create items.
Place SearchInput and two filtering Menus with LabelMenuButton triggers on the
left, with a primary Create Item button on the right. A collection index is a
top-level page, so the CTA and its row companions use `size="lg"`; the same
toolbar inside a tab, panel or detail page uses `md`. Keep results
below the toolbar and pagination below the results. This example uses a table
for comparing item attributes; choose another results layout when the content
calls for it, retaining the same search, filtering, and pagination behavior.
Wrap toolbar controls on narrow screens; scroll the table within its own region
rather than overflowing the page.

These menus apply single-choice filters, not form values or multi-selection.
Each LabelMenuButton displays the filter label and its current value. Its size
is fixed to large by Axiom; do not pass a size prop.
Search and both filters combine with AND before pagination. Reset to page one
when criteria change, and clamp the page if the parent removes rows. The owner
supplies local mock items and an onCreate callback that opens its creation flow.

Follow the [table-row action rule](../axiom-v3-implementation.md#tables):
collect row commands in a trailing Actions cell with one ellipsis Menu trigger.
Do not render Edit and Delete side by side. Keep each menu scoped to its item;
the owner supplies onEdit and onRequestDelete callbacks. onRequestDelete opens
a confirmation for that item, and only confirmation removes it from items.

```tsx
"use client";

import {
  Box, Button, EllipsisMenuButton, Group, LabelMenuButton, Menu, MenuContent, MenuTrigger, Pagination, SearchInput,
  Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, Tooltip,
} from "@optiaxiom/react";
import { IconPlus } from "@optiaxiom/icons";
import { useState } from "react";
import Flow from "@/app/components/Flow";

type Item = { id: string; name: string; status: "Draft" | "Ready"; owner: string };
const pageSize = 10;

export function ItemsList({ items, onCreate, onEdit, onRequestDelete }: {
  items: Item[];
  onCreate: () => void;
  onEdit: (item: Item) => void;
  onRequestDelete: (item: Item) => void;
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [owner, setOwner] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const search = query.trim().toLowerCase();
  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(search)
    && (status === null || item.status === status)
    && (owner === null || item.owner === owner)
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const activePage = Math.min(page, pageCount);
  const visibleItems = filtered.slice((activePage - 1) * pageSize, activePage * pageSize);
  const filters = [
    { label: "Status", value: status, values: ["Draft", "Ready"], setValue: setStatus },
    {
      label: "Owner", value: owner,
      values: Array.from(new Set(items.map((item) => item.owner))).sort(),
      setValue: setOwner,
    },
  ];

  if (page !== activePage) setPage(activePage);

  return (
    <Flow>
      <Group justifyContent="space-between" gap="12">
        <Group gap="8">
          <SearchInput
            aria-label="Search items"
            placeholder="Search items"
            size="lg"
            value={query}
            onValueChange={(value) => { setQuery(value); setPage(1); }}
          />
          {filters.map((filter) => (
            <Menu key={filter.label} options={[
              {
                label: "All", selected: filter.value === null,
                execute: () => { filter.setValue(null); setPage(1); },
              },
              ...filter.values.map((value) => ({
                label: value, selected: filter.value === value,
                execute: () => { filter.setValue(value); setPage(1); },
              })),
            ]}>
              <MenuTrigger asChild>
                <LabelMenuButton label={filter.label}>{filter.value ?? "All"}</LabelMenuButton>
              </MenuTrigger>
              <MenuContent />
            </Menu>
          ))}
        </Group>
        <Button icon={<IconPlus />} type="button" appearance="primary" size="lg" onClick={onCreate}>
          Create Item
        </Button>
      </Group>
      <Box overflowX="auto" tabIndex={0} role="region" aria-label="Items table">
        <Table aria-label="Items">
          <TableHeader>
            <TableRow>
              <TableHeaderCell scope="col">Name</TableHeaderCell>
              <TableHeaderCell scope="col">Status</TableHeaderCell>
              <TableHeaderCell scope="col">Owner</TableHeaderCell>
              <TableHeaderCell scope="col"></TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.owner}</TableCell>
                <TableCell w="min">
                  <Menu options={[
                    { label: "Edit", execute: () => onEdit(item) },
                    { label: "Delete", intent: "danger", execute: () => onRequestDelete(item) },
                  ]}>
                    <Tooltip content={`Actions for ${item.name}`}>
                      <MenuTrigger asChild>
                        <EllipsisMenuButton size="sm" aria-label={`Actions for ${item.name}`} />
                      </MenuTrigger>
                    </Tooltip>
                    <MenuContent />
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
            {visibleItems.length === 0 && (
              <TableRow>
                <TableCell colSpan={4}>
                  {items.length === 0 ? "No items yet." : "No items match your filters."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
      <Group justifyContent="center">
        <Pagination page={activePage} total={pageCount} onPageChange={setPage} />
      </Group>
    </Flow>
  );
}
```

Check: search is case-insensitive; clearing search and choosing All restore rows;
both filters combine and their LabelMenuButton values reflect the selection;
changing criteria from a later page returns to page one; removing the final row
on a page clamps pagination. Verify empty states, keyboard menu and pagination
operation, Create Item, and narrow-screen wrapping when mounted.
Verify that each row has only one ellipsis action trigger, its tooltip and
accessible name identify the item, and Edit/Delete target that item exactly once.
Escape closes the menu and returns focus to its trigger. Cancelling deletion
preserves the row; confirming removes only that row and clamps pagination.
Check the row menu at desktop and narrow widths using its observed overlay roles.