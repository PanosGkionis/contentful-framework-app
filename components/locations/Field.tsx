import React from 'react';
import {
	Option,
	Paragraph,
	Note,
	Select,
} from '@contentful/f36-components';
import {FieldAppSDK} from '@contentful/app-sdk';
import {/* useCMA, */ useSDK} from '@contentful/react-apps-toolkit';
import {countries} from 'utils/constants';

const Field = () => {
	const sdk = useSDK<FieldAppSDK>();
	const [selectedItem, setSelectedItem] = React.useState(sdk.field.getValue())

	// Parameters
	// console.log(sdk.parameters.instance.placeHolderText)


	const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		sdk.field.setValue(e.target.value)
		setSelectedItem(e.target.value)
	} 
	return (
		<div>
			<Paragraph>Select the country </Paragraph>
      			<Select onChange={handleOnChange}>
				{countries.map(country => (
					<Option key={country} value={country}>
						{country}
					</Option>
				))}
			</Select>
			<br />
			<Note>The {sdk.parameters.instance.placeHolderText} is {selectedItem} </Note>
		</div>
	);
};

export default Field;
