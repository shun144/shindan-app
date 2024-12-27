import { memo } from "react";
import Dropdown from "@/parts/dropdown/Dropdown";
// import { usePage } from "@inertiajs/react";

const ProfileDropdown = () => {
  // const user = usePage().props.auth.user;
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <span className="inline-flex rounded-md">
          <button type="button" className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150">
            {/* {user.name} */}

            <svg className="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </span>
      </Dropdown.Trigger>

      <Dropdown.Content>
        <Dropdown.Link to="/profile.edit">プロフィール</Dropdown.Link>
        <Dropdown.Link to="/logout">ログアウト</Dropdown.Link>
        {/* <Dropdown.Link href={route("profile.edit")}>プロフィール</Dropdown.Link>
        <Dropdown.Link href={route("logout")} method="post" as="button">
          ログアウト
        </Dropdown.Link> */}
      </Dropdown.Content>
    </Dropdown>
  );
};

export default memo(ProfileDropdown);
