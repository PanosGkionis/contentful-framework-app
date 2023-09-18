import React from 'react';
import {Button, Card} from '@contentful/f36-components';
import {PageAppSDK} from '@contentful/app-sdk';
import {
	Workbench,
	WorkbenchContent,
	WorkbenchHeader,
	WorkbenchSidebar,
} from '@contentful/f36-workbench';
import {/* useCMA, */ useSDK} from '@contentful/react-apps-toolkit';
import {createClient, Collection, Entry} from 'contentful-management';

const Page = () => {
	const sdk = useSDK<PageAppSDK>();
	const [blogPosts, setBlogPosts] = React.useState<Collection<
		Entry,
		any
	> | null>(null);

	const fetchBlogs = async () => {
		const cma = createClient({apiAdapter: sdk.cmaAdapter});
		const space = await cma.getSpace(sdk.ids.space);
		const environment = await space.getEnvironment(sdk.ids.environment);
		const blogs = await environment.getEntries({content_type: 'blog'});
		setBlogPosts(blogs as any);
	};

	React.useEffect(() => {
		fetchBlogs();
	}, []);

	const handleFetchBlogs = () => {
		setBlogPosts(null);
		fetchBlogs();
	};

	return (
		<Workbench>
			<WorkbenchHeader
				title='Blog app'
				description={`There are currently ${
					blogPosts?.total ?? 0
				} blog posts.`}
			/>
			<WorkbenchSidebar>
				<Button onClick={handleFetchBlogs} variant='primary'>
					Refresh Blogs
				</Button>
			</WorkbenchSidebar>
			<WorkbenchContent>
				{blogPosts?.items.map(blog => (
					<>
						<Card>
							<div className='flex'>
								<div className='w-1/2 text-bold'>
									{blog.fields.id['en-US']}
								</div>
								<div className='w-1/2'>
									{blog.fields.author['en-US']}
								</div>
							</div>
						</Card>
						<br />
					</>
				))}
			</WorkbenchContent>
		</Workbench>
	);
};

export default Page;
