import { useShow } from "@refinedev/core";
import { Show, TextFieldComponent as TextField } from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const ProjectShow = () => {
	const { query } = useShow();
	const { data, isLoading } = query;

	const record = data?.data;

	return (
		<Show isLoading={isLoading}>
			<Stack gap={1}>
				<Typography variant="body1" fontWeight="bold">
					Id
				</Typography>
				<TextField value={record?.id} />
				<Typography variant="body1" fontWeight="bold">
					Name
				</Typography>
				<TextField value={record?.name} />
			</Stack>
		</Show>
	);
};
