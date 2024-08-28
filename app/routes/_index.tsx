import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import ContactDetails from "~/components/ContactDetails";
import { useOverlay } from "~/components/Overlay";
import { getContacts } from "~/data";

export const meta: MetaFunction = () => {
  return [
    { title: "Contacts" },
    { name: "description", content: "Remix contacts tutorial!" },
  ];
};

export const loader: LoaderFunction = async () => {
  const contacts = await getContacts();
  return json({ contacts });
};

export default function Index() {
  const { contacts } = useLoaderData<typeof loader>();
  const { showOverlay, hideOverlay, isVisible } = useOverlay();
  const prevIsVisible = useRef(isVisible);

  useEffect(() => {
    if (prevIsVisible.current && !isVisible) {
      hideOverlay();
      window.history.pushState({}, "", `/`);
    }

    prevIsVisible.current = isVisible;
  }, [isVisible, hideOverlay]);

  return (
    <div className="flex flex-row flex-wrap gap-3">
      {contacts.map(({ id, first, avatar, last, twitter, notes }) => (
        <Link
          key={id}
          to={`/contacts/${id}`}
          onClick={(event) => {
            event.preventDefault();
            showOverlay(
              <ContactDetails
                avatar={avatar}
                first={first}
                last={last}
                twitter={twitter}
                notes={notes}
              />
            );
            window.history.pushState({}, "", `/contacts/${id}`);
          }}
          className="flex items-center p-4 mb-4 bg-white rounded-lg shadow-md"
        >
          <img
            src={avatar}
            alt={`${first} ${last}`}
            className="w-16 h-16 rounded-full"
          />
          <div className="ml-4">
            <h2 className="text-lg font-semibold">
              {first} {last}
            </h2>
            <p className="text-sm text-gray-500">{twitter}</p>
            <p className="mt-2 text-sm text-gray-700">{notes}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
