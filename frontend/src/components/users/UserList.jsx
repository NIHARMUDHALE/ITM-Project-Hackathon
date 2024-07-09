import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { BsChevronExpand } from "react-icons/bs";
import clsx from "clsx";
import { getInitials } from "../../utils/getInitials";
import { MdCheck } from "react-icons/md";
import { useGetAllUsers } from "../../hooks/useClerkQuery.js";

const UserList = ({
  selectedWorkers,
  setTeam,
  team,
  userListTitle,
  handleWorkersList,
  workerType,
}) => {
  const [selectedUsers, setSelectedUsers] = useState([{}]);

  const { data: allUsers } = useGetAllUsers();

  const handleChange = (el) => {
    handleWorkersList(workerType, el);
    setTeam(el?.map((u) => u._id));
  };

  useEffect(() => {
    setSelectedUsers(selectedWorkers);
  }, [handleWorkersList]);

  useEffect(() => {
    if (team?.length < 1) {
      allUsers && setSelectedUsers(allUsers);
    } else {
      setSelectedUsers(team);
    }
  }, []);

  return (
    <div className="w-72 flex flex-col justify-center mb-3">
      <p className="text-gray-700 mb-1">{userListTitle}</p>
      <Listbox
        value={selectedWorkers}
        onChange={(el) => handleChange(el)}
        multiple
      >
        <div className="relative">
          <ListboxButton className="relative w-full cursor-default rounded bg-white text-left px-2 py-2  border border-gray-300 sm:text-sm">
            <span className="block truncate">
              {selectedUsers
                ?.map((user) => (user.name ? user.name.split(" ")[0] : " "))
                .join(", ")}
            </span>

            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <BsChevronExpand
                className="h-3 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="z-50 absolute max-h-30 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {allUsers?.map((user, index) => (
                <ListboxOption
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4. ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    } `
                  }
                  value={user}
                >
                  {({ selected }) => (
                    <>
                      <div
                        className={clsx(
                          "flex items-center gap-2 truncate",
                          selected ? "font-medium" : "font-normal",
                        )}
                      >
                        <div className="w-6 h-6 rounded-full text-white flex items-center justify-center bg-violet-600">
                          <span className="text-center text-[10px]">
                            {getInitials(user.name)}
                          </span>
                        </div>
                        <span>{user.name}</span>
                      </div>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <MdCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default UserList;
