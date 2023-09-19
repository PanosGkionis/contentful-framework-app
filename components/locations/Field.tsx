import React from 'react';
import {Option, Paragraph, Note, Select} from '@contentful/f36-components';
import {FieldAppSDK} from '@contentful/app-sdk';
import {/* useCMA, */ useSDK} from '@contentful/react-apps-toolkit';
import {colors} from 'utils/constants';

const Field = () => {
	const sdk = useSDK<FieldAppSDK>();
	const [selectedColor, setSelectedColor] = React.useState(
		sdk.field.getValue()
	);

	// Parameters
	// console.log(sdk.parameters.instance.placeHolderText)

	const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		sdk.field.setValue(e.target.value);
		setSelectedColor(e.target.value);
	};
	return (
		<>
			<Paragraph>Select the Color</Paragraph>
			<Select onChange={handleOnChange}>
				{colors.map(color => (
					<Option
						key={color}
						style={{backgroundColor: color, color: 'white'}}
						value={color}
					>
						{color}
					</Option>
				))}
			</Select>
			<br />
			<Note>
				The {sdk.parameters.instance.placeHolderText} is {selectedColor}{' '}
			</Note>
		</>
	);
};

export default Field;
