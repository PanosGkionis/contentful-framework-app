import React, {useState, useEffect} from 'react';
import {Button, Card} from '@contentful/f36-components';
import {PageAppSDK} from '@contentful/app-sdk';
import {
	Workbench,
	WorkbenchContent,
	WorkbenchHeader,
	WorkbenchSidebar,
} from '@contentful/f36-workbench';
import {useSDK} from '@contentful/react-apps-toolkit';
import {createClient} from 'contentful-management';

// Helper function to check if 'publishedAt' exists in the 'sys' object
function hasPublishedAtKey(obj: any) {
	return (
		obj && typeof obj === 'object' && obj.sys && 'publishedAt' in obj.sys
	);
}

const Page = () => {
	const sdk = useSDK<PageAppSDK>();
	const [blogPosts, setBlogPosts] = useState<any>([]);

	const fetchBlogs = async () => {
		try {
			const cma = createClient({apiAdapter: sdk.cmaAdapter});
			const space = await cma.getSpace(sdk.ids.space);
			const environment = await space.getEnvironment(sdk.ids.environment);
			const blogs = await environment.getEntries({content_type: 'blog'});
			const publishedBlogs = blogs.items.filter(hasPublishedAtKey);
			setBlogPosts(publishedBlogs);
		} catch (error) {
			console.error('Error fetching blog posts:', error);
		}
	};

	useEffect(() => {
		fetchBlogs();
	}, []);

	const handleFetchBlogs = () => {
		setBlogPosts([]);
		fetchBlogs();
	};

	const handleCreateBlog = () => {
		sdk.navigator.openNewEntry('blog');
	};

	const handleEditBlog = (id: string) => {
		sdk.navigator.openEntry(id);
	};

	return (
		<Workbench>
			<WorkbenchHeader
				title='Blog app'
				description={`There are currently ${blogPosts.length} blog posts.`}
			/>
			<WorkbenchSidebar>
				<div className='flex flex-col gap-1'>
					<Button onClick={handleCreateBlog} variant='positive'>
						Add Blog
					</Button>
					<Button onClick={handleFetchBlogs} variant='primary'>
						Refresh Blogs
					</Button>
				</div>
			</WorkbenchSidebar>
			<WorkbenchContent>
				{blogPosts.map((blog: any) => {
					const body = blog.fields.body['en-US'];
					const words = body.split(/\s+/);
					const wordCount = words.length;
					const readTime = (wordCount / 200).toFixed(0);
					const id = blog.fields.id['en-US'];
					const author = blog.fields.author['en-US'];
					const sysId = blog.sys.id;

					return (
						<Card key={sysId}>
							<div className='flex justify-between gap-1'>
								<div>
									<div className='font-bold'>{id}</div>
									<div>{author}</div>
									<div>
										{`${body.substring(0, 50)}... Words: (${
											body.length
										}) Read time: ${
											(readTime as unknown as number) < 1
												? 'Less than a min'
												: `${readTime} min`
										}`}
									</div>
								</div>
								<div className='flex flex-col gap-1 items-end justify-end'>
									<Button
										onClick={() => handleEditBlog(sysId)}
										variant='secondary'
									>
										Edit
									</Button>
								</div>
							</div>
						</Card>
					);
				})}
			</WorkbenchContent>
		</Workbench>
	);
};

export default Page;
