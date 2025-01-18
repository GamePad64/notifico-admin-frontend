import {Edit, useAutocomplete} from "@refinedev/mui";
import {
	Box,
	TextField,
	Autocomplete,
	Checkbox,
	FormControlLabel,
} from "@mui/material";
import {useForm} from "@refinedev/react-hook-form";
import {Controller} from "react-hook-form";

export const PipelineEdit = () => {
	const {
		saveButtonProps,
		refineCore: {query},
		register,
		control,
		formState: {errors},
	} = useForm();

	const pipelinesData = query?.data?.data;

	const {autocompleteProps: projectAutocompleteProps} = useAutocomplete({
		resource: "projects",
		defaultValue: pipelinesData?.project_id,
	});

	const {autocompleteProps: eventAutocompleteProps} = useAutocomplete({
		resource: "events",
		defaultValue: pipelinesData?.event_ids,
	});

	return (
		<Edit saveButtonProps={saveButtonProps}>
			<Box
				component="form"
				sx={{display: "flex", flexDirection: "column"}}
				autoComplete="off"
			>
				<TextField
					{...register("id", {
						required: "This field is required",
					})}
					error={!!(errors as any)?.id}
					helperText={(errors as any)?.id?.message}
					margin="normal"
					fullWidth
					slotProps={{
						inputLabel: {
							shrink: true,
						},
					}}
					type="text"
					label="Id"
					name="id"
					disabled
				/>
				<Controller
					control={control}
					name="project_id"
					rules={{required: "This field is required"}}
					// eslint-disable-next-line
					defaultValue={null as any}
					render={({field}) => (
						<Autocomplete
							{...projectAutocompleteProps}
							{...field}
							onChange={(_, value) => {
								field.onChange(value?.id ?? value);
							}}
							getOptionLabel={(item) => {
								return (
									projectAutocompleteProps?.options?.find(
										(p) =>
											p?.id?.toString() ===
											(item?.id ?? item)?.toString(),
									)?.name ?? ""
								);
							}}
							isOptionEqualToValue={(option, value) =>
								value === undefined ||
								option?.id?.toString() ===
								(value?.id ?? value)?.toString()
							}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Project"
									margin="normal"
									variant="outlined"
									error={!!(errors as any)?.project_id}
									helperText={
										(errors as any)?.project_id?.message
									}
									required
								/>
							)}
						/>
					)}
				/>
				<TextField
					{...register("steps", {
						required: "This field is required",
					})}
					error={!!(errors as any)?.steps}
					helperText={(errors as any)?.steps?.message}
					margin="normal"
					fullWidth
					slotProps={{
						inputLabel: {
							shrink: true,
						},
					}}
					type="text"
					label="Steps"
					name="steps"
					multiline={true}
				/>
				<Controller
					control={control}
					name="event_ids"
					rules={{required: "This field is required"}}
					// eslint-disable-next-line
					defaultValue={[] as any}
					render={({field}) => (
						<Autocomplete
							{...eventAutocompleteProps}
							{...field}
							multiple
							onChange={(_, value) => {
								field.onChange(
									value?.map((item: any) => item?.id ?? item),
								);
							}}
							getOptionLabel={(item) => {
								return (
									eventAutocompleteProps?.options?.find(
										(p) =>
											p?.id?.toString() ===
											(item?.id ?? item)?.toString(),
									)?.name ?? ""
								);
							}}
							isOptionEqualToValue={(option, value) =>
								value === undefined ||
								option?.id?.toString() ===
								(value?.id ?? value)?.toString()
							}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Event"
									margin="normal"
									variant="outlined"
									error={!!(errors as any)?.event_ids}
									helperText={
										(errors as any)?.event_ids?.message
									}
									required
								/>
							)}
						/>
					)}
				/>
				<Controller
					control={control}
					name="enabled"
					// eslint-disable-next-line
					defaultValue={null as any}
					render={({field}) => (
						<FormControlLabel
							label="Enabled"
							control={
								<Checkbox
									{...field}
									checked={field.value}
									onChange={(event) => {
										field.onChange(event.target.checked);
									}}
								/>
							}
						/>
					)}
				/>
			</Box>
		</Edit>
	);
};
