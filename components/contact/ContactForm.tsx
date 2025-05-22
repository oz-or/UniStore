"use client";

import { useRef } from "react";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { Input } from "../ui/Input";

//Toasts
const successToast = () =>
  toast.success(
    "Your message was sent successfully. We will get back to you as soon as possible.",
    { duration: 6000 }
  );
const errorToast = () =>
  toast.error("Something went wrong. Please try again later.", {
    duration: 6000,
  });

//Contact Form
const ContactForm = () => {
  const form = useRef<HTMLFormElement | null>(null);

  const serviceId = process.env.NEXT_PUBLIC_CONTACT_SERVICE_ID!;
  const templateId = process.env.NEXT_PUBLIC_CONTACT_TEMPLATE_ID!;
  const publicKey = process.env.NEXT_PUBLIC_CONTACT_PUBLIC_KEY!;

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(serviceId, templateId, form.current as HTMLFormElement, {
          publicKey,
        })
        .then(
          () => {
            successToast();
          },
          () => {
            errorToast();
          }
        );

      (e.currentTarget as HTMLFormElement).reset();
    }
  };

  return (
    <>
      <form
        ref={form}
        onSubmit={sendEmail}
        className="flex flex-col gap-y-5 1200:gap-y-1"
      >
        <div className="flex flex-col gap-y-8 1024:gap-y-10 1200:flex-row 1200:gap-x-5 ">
          <Input
            type="text"
            name="user_name"
            placeholder="Your Name *"
            className="pl-4 py-2.5 relative placeholder:opacity-90 bg-secondary rounded-[4px] border-none 500:pl-6 1024:w-[400px] 1200:w-full border-neutral-300 focus:outline-none focus:ring-[1px] focus:ring-neutral-300 1440:text-[16px] 1440:py-3 1440:placeholder:opacity-60 "
          />

          <Input
            type="email"
            name="user_email"
            placeholder="Your Email *"
            className="pl-4 py-2.5 relative placeholder:opacity-90 bg-secondary rounded-[4px] border-none 500:pl-6 border-neutral-300 focus:outline-none focus:ring-[1px] focus:ring-neutral-300 1440:text-[16px] 1440:py-3 1440:placeholder:opacity-60 "
          />
          <Input
            type="text"
            name="user_phone"
            placeholder="Your Phone *"
            className="pl-4 py-2.5 relative placeholder:opacity-90 bg-secondary rounded-[4px] border-none 500:pl-6 border-neutral-300 focus:outline-none focus:ring-[1px] focus:ring-neutral-300 1440:text-[16px] 1440:py-3 1440:placeholder:opacity-60 "
          />
        </div>
        <textarea
          rows={6}
          name="message"
          placeholder="Your Message *"
          className="pl-4 py-2.5 relative bg-secondary rounded-[4px] border-none h-full 500:pl-6 border-neutral-400 focus:outline-none focus:ring-[1px] focus:ring-neutral-400 1440:text-[16px] 1440:py-3 1440:placeholder:opacity-60 mt-3 1024:mt-5"
        />
        <div className="flex w-full justify-end">
          <Input
            type="submit"
            value="Send"
            className="cursor-pointer bg-secondary-2 text-text w-[170px] font-medium  750:text-sm 500:w-[200px] rounded 1200:mt-4"
          />
        </div>
      </form>
      <Toaster />
    </>
  );
};

export default ContactForm;
