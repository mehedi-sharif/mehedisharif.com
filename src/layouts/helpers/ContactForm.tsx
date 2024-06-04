import React, { useRef, useState } from "react";
import config from "@/config/config.json";
const { formsubmit_endpoint } = config.bio;

const ContactForm: React.FC = () => {
	const [submitted, setSubmitted] = useState<boolean | null>(null);
	const [loader, setLoader] = useState(false);

	const fullNameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const messageRef = useRef<HTMLTextAreaElement>(null);

	const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const fullName = fullNameRef.current?.value.trim();
		const email = emailRef.current?.value.trim();
		const message = messageRef.current?.value.trim();

		// Basic validation
		if (!fullName || !email || !message) {
			setSubmitted(false);
			setLoader(false);
			return;
		}

		setLoader(true);

		fetch(`https://formsubmit.co/ajax/${formsubmit_endpoint}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				_subject: "Message From Personal Website",
				name: fullName,
				email: email,
				message: message,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				setSubmitted(data.success);
				setLoader(false);
				setTimeout(() => {
					setSubmitted(null);
				}, 4000);
				e.currentTarget.reset();
			})
			.catch((error) => {
				setSubmitted(error);
				setLoader(false);
			});
	};

	return (
		<>
			<form
				className="text-base sm:text-h4"
				method="POST"
				onSubmit={formHandler}
			>
				<div className="form-inputs mb-16">
					<span>Hi, My Name is</span>{" "}
					<input
						type="text"
						id="full_name"
						name="full_name"
						ref={fullNameRef}
						className="leading-0 w-full max-w-[300px] border-0 border-b border-black p-0 text-base focus:border-black focus:ring-0 dark:border-white dark:bg-transparent sm:text-h4"
						placeholder="type here"
					/>
					<span>Here is my Email Address </span>{" "}
					<input
						type="email"
						id="email"
						name="email"
						ref={emailRef}
						className="leading-0 w-full max-w-[500px] border-0 border-b border-black p-0 text-base focus:border-black focus:ring-0 dark:border-white dark:bg-transparent sm:text-h3"
						placeholder="type here"
					/>{" "}
					<span>I would love to get in touch with you.....</span>
				</div>
				<textarea
					className="mb-12 w-full rounded-lg border-black p-4 text-base focus:border-black focus:ring-0 dark:border-white dark:bg-transparent"
					rows={5}
					id="message"
					name="message"
					ref={messageRef}
					placeholder="Let’s make something awesome together......"
				></textarea>
				<button className="btn" type="submit" disabled={loader}>
					{loader ? "Submitting.." : "Submit Now"}
				</button>
			</form>
			{submitted !== null && (
				<p
					className={`mt-6 text-base ${submitted ? "text-green-400" : "text-red-400"}`}
				>
					{submitted
						? "Message Submitted Successfully!"
						: "Something went wrong! Please try again."}
				</p>
			)}
		</>
	);
};

export default ContactForm;
