import React, { useState } from "react";
import {
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Select,
  Button,
} from "@headlessui/react";
import clsx from "clsx";
import { FaAngleDown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAuth, useClerk } from "@clerk/clerk-react";
import { useCreateUserWithRole, useDeleteUser } from "../hooks/useClerkQuery";

const UserRole = () => {
  const clerk = useClerk();
  const [selectedRole, setSelectedRole] = useState("Creator");
  const [enteredToken, setEnteredToken] = useState("");

  const addUserWithRoleMutation = useCreateUserWithRole();
  const deleteMutation = useDeleteUser();
  const changeTokenHandler = (event) => {
    const newValue = event.target.value;
    setTimeout(() => {
      setEnteredToken(newValue);
    }, 0.5);
  };

  const navigate = useNavigate();
  let submitHandler = (e) => {
    e.preventDefault();
    try {
      addUserWithRoleMutation.mutate({
        role: selectedRole,
        token: enteredToken,
      });
      setEnteredToken("");
      setSelectedRole("Creator");
      navigate("/dashboard");
    } catch (e) {
      console.log(error);
      navigate("/");
    }
  };

  const cancelButtonHandler = () => {
    deleteMutation.mutate();
    clerk.signOut();
    navigate("/");
  };
  //add cancel button so if user cancels userrole. delete his account
  return (
    <>
      <div className="w-full max-w-lg px-4 m-auto">
        <Fieldset className="space-y-6 rounded-xl bg-white/5 p-6 sm:p-10">
          <Legend className="text-base/7 font-semibold text-white">
            Choose your role
          </Legend>
          <Field>
            <Label className="text-sm/6 font-medium text-white">Role</Label>
            <Description className="text-sm/6 text-white/50">
              Please ask creator for token (token89728&@5389&*Q&)
            </Description>
            <div className="relative">
              <Select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className={clsx(
                  "mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                  // Make the text of each option black on Windows
                  "*:text-black",
                )}
              >
                <option value="Creator">Creator</option>
                <option value="Collaborator">Collaborator</option>
                <option value="Viewer">Viewer</option>
              </Select>
              <FaAngleDown
                aria-hidden="true"
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
              />
            </div>
          </Field>
          <Field>
            <Label className="text-sm/6 font-medium text-white">Token</Label>
            <Input
              name="role"
              disabled={addUserWithRoleMutation.isPending}
              autoFocus
              onChange={changeTokenHandler}
              value={enteredToken}
              type="text"
              className={clsx(
                "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
              )}
            />
          </Field>
          <Button
            type="submit"
            onClick={cancelButtonHandler}
            className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={submitHandler}
            className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700"
          >
            Proceed
          </Button>
        </Fieldset>
      </div>
    </>
  );
};

export default UserRole;
