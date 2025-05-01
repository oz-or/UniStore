const HeaderAndEdit = ({
  header,
  handleEdit,
  isEditing,
  loading,
}: {
  header: string;
  handleEdit?: () => void;
  isEditing?: boolean;
  loading?: boolean;
}) => {
  return (
    <div className="flex justify-between items-center mb-3 500:mb-5 750:mb-8">
      <h2 className="font-semibold text-[13px] 500:text-[15px] 750:text-base 1200:text-lg 1440:text-xl">
        {header}
      </h2>
      {handleEdit && (
        <button
          onClick={handleEdit}
          disabled={loading}
          className={`flex shadow-account-rectangle px-1 py-0.5 items-center translate-y-[2px] rounded ${
            isEditing && "animate-pop"
          }`}
        >
          <img
            src="/account/pencil-edit.png"
            alt="Edit"
            className="w-2 mr-1 ml-0.5 750:w-[11px] 1440:w-3"
          />
          <span className="opacity-60 text-[8px] 500:text-[10px] 750:text-[13px] 1440:text-sm">
            {isEditing ? "Save Profile" : "Edit Profile"}
          </span>
        </button>
      )}
    </div>
  );
};

export default HeaderAndEdit;
