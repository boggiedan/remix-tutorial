import { ContactRecord } from "~/data";

const ContactDetails = ({
  avatar,
  first,
  last,
  twitter,
  notes,
}: Omit<ContactRecord, "createdAt" | "id">) => {
  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="flex items-center mb-4">
        <img
          loading="lazy"
          src={avatar || "https://via.placeholder.com/150"}
          alt={`${first} ${last}`}
          className="w-24 h-24 rounded-full border-2 border-gray-300"
        />
        <div className="ml-4">
          <h1 className="text-2xl font-bold">{`${first} ${last}`}</h1>
          {twitter && (
            <p className="text-blue-500">
              <a
                href={`https://twitter.com/${twitter.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {twitter}
              </a>
            </p>
          )}
          {notes && <p className="mt-2 text-sm text-gray-700">{notes}</p>}
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
