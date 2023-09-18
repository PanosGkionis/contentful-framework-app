import React from 'react';
import {Note} from '@contentful/f36-components';
import {SidebarAppSDK} from '@contentful/app-sdk';
import {/* useCMA, */ useSDK} from '@contentful/react-apps-toolkit';

const Sidebar = () => {
	const sdk = useSDK<SidebarAppSDK>();
	const [blogPostNum, setBlogPostNum] = React.useState(0);

	React.useEffect(() => {
		sdk.space
			.getEntries({content_type: 'blog'})
			.then(item => setBlogPostNum(item.total));
	},[]);

	return <Note>Number of blog posts ({blogPostNum})</Note>;
};

export default Sidebar;
