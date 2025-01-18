import { Create } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";

export const ProjectCreate = () => {
	const {
		saveButtonProps,
		refineCore: { formLoading },
		register,
		control,
		formState: { errors },
	} = useForm();

	return (
		<Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
			<Box
				component="form"
				sx={{ display: "flex", flexDirection: "column" }}
				autoComplete="off"
			>
				<TextField
					{...register("name", {
						required: "This field is required",
					})}
					error={!!(errors as any)?.name}
					helperText={(errors as any)?.name?.message}
					margin="normal"
					fullWidth
					slotProps={{
						inputLabel: {
							shrink: true,
						},
					}}
					type="text"
					label="Name"
					name="name"
				/>
			</Box>
		</Create>
	);
};
