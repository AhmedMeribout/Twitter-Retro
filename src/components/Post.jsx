import { IoEllipsisHorizontal } from "react-icons/io5";

import ActionButtons from "./ActionsButtons";

import { Link } from "react-router-dom";

const Post = (props) => {
  return (
    <Link
      className="flex w-full flex-row pr-4 pl-4 pt-3 font-sans border-b-[1px] cursor-pointer"
      to={"/" + props.data.username + "/status/" + props.data.id}
    >
      <div className="flex w-[40px] mr-2">
        <img
          className="flex h-[40px] w-[40px] rounded-full object-cover"
          src={`./src/services/images-profile/${props.data.imageProfile}`}
        />
      </div>
      <main className="flex flex-[15] flex-col ">
        <div className="">
          <div className="flex h-[20px] w-full justify-between">
            <p className="font-bold text-sm">{props.data.user}</p>
            <div />
            <button>
              <IoEllipsisHorizontal />
            </button>
          </div>
          <div className="flex flex-col">
            <p className="text-left text-sm">{props.data.content}</p>
            <Link
              to={{
                pathname:
                  "/" +
                  props.data.username +
                  "/status/" +
                  props.data.id +
                  "/photo/", // TODO multiple photo
                state: {
                  image: props.data.imageContent,
                },
              }}
            >
              <img
                className="flex rounded-xl object-cover mt-3"
                src={"./src/services/images-content/" + props.data.imageContent}
              />
            </Link>
            <ActionButtons view="menu" />
          </div>
        </div>
      </main>
    </Link>
  );
};

export default Post;
