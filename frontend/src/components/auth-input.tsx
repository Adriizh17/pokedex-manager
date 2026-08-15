interface AuthInputProps {
	label: string;
	name: string;
	type?: "text" | "email" | "password";
	placeholder?: string;
	required?: boolean;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function AuthInput({
	label,
	name,
	type = "text",
	placeholder,
	required = true,
	onChange,
}: AuthInputProps) {
	return (
		<div className="space-y-2">
			<label htmlFor={name} className="block text-sm font-medium text-black">
				{label}
			</label>

			<input
				id={name}
				name={name}
				type={type}
				placeholder={placeholder}
				required={required}
                onChange={onChange}
				className="w-full rounded-lg border border-gray-500 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
			/>
		</div>
	);
}
