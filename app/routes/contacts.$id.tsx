import { LoaderFunction, MetaArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json } from "react-router";
import ContactDetails from "~/components/ContactDetails";
import { getContact } from "~/data";

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.id) {
    return json({}, { status: 404 });
  }

  const contact = await getContact(params.id);

  if (!contact) {
    return json({}, { status: 404 });
  }

  return json({ data: contact });
};

export const meta: MetaFunction = ({ data }: MetaArgs<typeof loader>) => {
  if (!data.data) {
    return [{ title: "No contact found" }];
  }

  return [
    { title: `${data.data.first} ${data.data.last} information` },
    { name: "description", content: "Contact information!" },
  ];
};

export default function Contact() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <ContactDetails
      key={data.id}
      avatar={data.avatar}
      first={data.first}
      last={data.last}
      twitter={data.twitter}
      notes={data.notes}
    />
  );
}
