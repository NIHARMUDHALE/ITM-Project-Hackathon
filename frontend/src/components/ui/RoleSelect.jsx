import { Description, Field, Label, Select } from "@headlessui/react";
import clsx from "clsx";

export default function RoleSelect({
  roles,
  selectedRole,
  handleRoleChange,
  user,
}) {
  return (
    <Field>
      <Select
        value={selectedRole}
        onChange={(e) => handleRoleChange(user, e)}
        className={clsx(
          "block w-auto appearance-none rounded-lg border-none bg-gray/5 py-1.5 px-3 text-sm/6 text-violet-600",
          "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
          // Make the text of each option black on Windows
          "*:text-black",
        )}
      >
        {roles.map((role) => {
          return (
            <option value={role} key={role}>
              {role}
            </option>
          );
        })}
      </Select>
    </Field>
  );
}
