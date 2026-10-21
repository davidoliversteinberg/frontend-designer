## Validated form

Use Field for the label, required indicator, and associated error. Submit through
a form so Enter and the save button take the same path. This example calls a
synchronous local mock-data callback; asynchronous saving also needs pending and
failure states before it is ready to reuse.

```tsx
"use client";

import { Button, Field, Group, Input } from "@optiaxiom/react";
import { useState } from "react";

export function NameForm({ onSave }: { onSave: (name: string) => void }) {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const error = submitted && !name.trim() ? "Enter a name." : undefined;

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
        if (name.trim()) onSave(name.trim());
      }}
    >
      <Group flexDirection="column" gap="16" alignItems="stretch">
        <Field label="Name" required error={error}>
          <Input value={name} onChange={(event) => setName(event.target.value)} />
        </Field>
        <Group justifyContent="flex-end">
          <Button type="submit" appearance="primary">Save</Button>
        </Group>
      </Group>
    </form>
  );
}
```

Check: blank and whitespace-only submissions show the associated error; Enter
submits once; a valid name reaches the callback trimmed.

## Controlled selection with a fallback

Keep option values nonempty and validate external or restored selections. The
fallback below is a display value, not a write to persistent state. If used with
usePersistentState, also gate rendering on its hydration contract and validate
the value again when saving the containing form.

```tsx
"use client";

import { Field, Select, SelectContent, SelectTrigger } from "@optiaxiom/react";

const statusOptions = [
  { label: "Draft", value: "draft" },
  { label: "Ready", value: "ready" },
];

export function StatusField({ value, onChange }: {
  value: string;
  onChange: (value: string) => void;
}) {
  const selected = statusOptions.some((option) => option.value === value)
    ? value : "draft";

  return (
    <Field label="Status">
      <Select options={statusOptions} value={selected} onValueChange={onChange}>
        <SelectTrigger />
        <SelectContent />
      </Select>
    </Field>
  );
}
```

Check: unknown values display Draft; keyboard selection calls onChange; reopening
the select retains the parent's current selection.

## Data-driven action menu

Use Menu for commands, Select for choosing a form value. Keep actions scoped to
the object and delegate their effects to the owner; do not render decorative
options without working callbacks.

```tsx
"use client";

import { Menu, MenuContent, MenuTrigger } from "@optiaxiom/react";

export function ItemActions({ name, onEdit, onDuplicate }: {
  name: string;
  onEdit: () => void;
  onDuplicate: () => void;
}) {
  return (
    <Menu options={[
      { label: "Edit", execute: onEdit },
      { label: "Duplicate", execute: onDuplicate },
    ]}>
      <MenuTrigger aria-label={`Actions for ${name}`}>Actions</MenuTrigger>
      <MenuContent />
    </Menu>
  );
}
```

Check: keyboard activation invokes the correct callback once; Escape closes the
menu and restores focus; repeated rows have object-specific accessible names.

