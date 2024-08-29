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
          onClick={async (event) => {
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
            await fetch("/", {
              method: "POST",
            });
          }}
        >
          <ContactDetails
            avatar={avatar}
            first={first}
            last={last}
            twitter={twitter}
            notes={notes}
          />
        </Link>
      ))}
    </div>
  );
}
