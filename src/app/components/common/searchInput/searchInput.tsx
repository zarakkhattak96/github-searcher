import { Input } from "antd";
import { useStyle } from "../../../../styles/style";
import type React from "react";
import type { ISearchInputProps } from "../../../../utils/interfaces";

export const SearchInputComponent: React.FC<ISearchInputProps> = ({
	username,
	setUsername,
	handleInputChange,
}) => {
	const { styles } = useStyle();

	return (
		<Input
			placeholder="Start typing here .."
			maxLength={50}
			size="large"
			value={username}
			onChange={(e) => {
				const v = e.target.value;
				setUsername(e.target.value);
				handleInputChange(v);
			}}
			className={styles.searchField}
		/>
	);
};
