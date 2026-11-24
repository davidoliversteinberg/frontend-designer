## Picker with search and filter (candidate)

Candidate, not yet confirmed by the design owners. It comes from the Create page
dialog (`app/cms/edit/create-page/TemplateColumn.tsx`); revisit it when a second
product needs the same thing.

Use this when someone chooses one item from a browsable set that holds more than
one kind of item, in a dialog or beside a form, for example blueprints and content
types. It is the [list view](list-view.md) toolbar over a card grid: SearchInput
first, then one single-choice filter Menu with a LabelMenuButton trigger. Follow
list view for the toolbar rules and the filter's behavior.

Do not build the filter with SegmentedControl. Axiom's SegmentedControl examples
switch how the same content is shown, such as list or grid, or a desktop, tablet
and mobile preview. Here an option changes which items are listed, so it is a
filter, and a list-style page gets search plus filters.

- Show one list with the filter on All, grouped under labelled headings (one
  `role="group"` per group). The same name can exist as two kinds, and the heading
  is what tells them apart.
- Search and filter combine with AND. Choices made elsewhere in the form, such as a
  location, narrow the set before either applies, so the owner passes entries that
  are already narrowed.
- When the narrowed set has no item of a kind, keep that filter option, disabled.
  The installed Menu skips a disabled item without showing `disabledReason`, so
  also give it a `description`. If that kind was the active filter, fall back to
  All instead of showing an empty list.
- A card toggles: choosing the selected card again clears it. The chosen item is
  reported elsewhere, such as a summary row in the form, and the picker only
  reports the click.
- The column scrolls, so its padding must cover the 4px focus ring, or the first
  and last controls lose their rings at the edge.

```tsx
"use client";

import {
  Box, Group, LabelMenuButton, Menu, MenuContent, MenuTrigger, SearchInput, Text, type MenuOption,
} from "@optiaxiom/react";
import { useState } from "react";
import { TypePickerCard } from "@/app/components/picker/TypePickerCard";

type Kind = "blueprint" | "type";
type Entry = { id: string; name: string; description?: string; kind: Kind; group: string };
type Filter = "all" | Kind;

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "blueprint", label: "Blueprints" },
  { value: "type", label: "Content types" },
];

export function EntryPicker({ entries, selectedId, onSelect }: {
  /** Already narrowed by the owner, for example to what a chosen location accepts. */
  entries: Entry[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const kindsPresent = new Set(entries.map((entry) => entry.kind));
  const offered = (value: Filter) => value === "all" || kindsPresent.has(value);
  // A filter that stops being offered falls back to All rather than an empty list.
  if (!offered(filter)) setFilter("all");
  const active = offered(filter) ? filter : "all";
  const search = query.trim().toLowerCase();
  const groups = new Map<string, Entry[]>();
  entries
    .filter((entry) => (active === "all" || entry.kind === active) && entry.name.toLowerCase().includes(search))
    .forEach((entry) => groups.set(entry.group, [...(groups.get(entry.group) ?? []), entry]));
  const options: MenuOption[] = filters.map(({ value, label }) => ({
    label,
    selected: active === value,
    execute: () => setFilter(value),
    // The reason is not shown by the menu, so the description says it in text too.
    disabledReason: offered(value) ? undefined : `${label} can't be chosen here`,
    description: offered(value) ? undefined : "Not available here",
  }));

  return (
    <Group flexDirection="column" gap="16" role="region" aria-label="Entries">
      <Group gap="8" flexWrap="wrap">
        <Box flex="1" style={{ minWidth: 180 }}>
          <SearchInput
            aria-label="Search entries"
            placeholder="Search entries"
            size="lg"
            value={query}
            onValueChange={setQuery}
          />
        </Box>
        <Menu options={options}>
          <MenuTrigger asChild>
            <LabelMenuButton label="Type">{filters.find((item) => item.value === active)?.label}</LabelMenuButton>
          </MenuTrigger>
          <MenuContent />
        </Menu>
      </Group>
      {[...groups].map(([group, items]) => (
        <Group key={group} role="group" aria-label={group} flexDirection="column" gap="12">
          <Text fontWeight="600">{group}</Text>
          <Box display="grid" gap="12" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
            {items.map((entry) => (
              <TypePickerCard
                key={entry.id}
                name={entry.name}
                description={entry.description}
                shape="page"
                isSelected={entry.id === selectedId}
                onSelect={() => onSelect(entry.id === selectedId ? null : entry.id)}
              />
            ))}
          </Box>
        </Group>
      ))}
      {groups.size === 0 && <Text>No entries match your search</Text>}
    </Group>
  );
}
```

Check: the list shows every group on All, and each filter option leaves only its
kind; search narrows within the filter, and clearing it restores the list; an
option with no items is disabled with visible text, and choosing a location that
removes the active kind drops the filter to All. The menu opens from the keyboard,
Escape closes only the menu (a dialog stays open) and returns focus to the
trigger. Verify the focus ring of the search field and the filter at the
scrolling column's edges, and that the toolbar wraps at narrow widths.
