import React, {useCallback} from 'react';
import {useCMA, useSDK} from '@contentful/react-apps-toolkit';
import {useAsync} from 'react-async-hook';
import {Flex, Text} from '@contentful/f36-components';
import tokens from '@contentful/f36-tokens';
import Image from 'next/image';

interface ProfileProps {
	firstName: string;
	lastName: string;
	email: string;
	avatarUrl: string;
}

const ProfileCard: React.FC<ProfileProps> = ({
	firstName,
	lastName,
	email,
	avatarUrl,
}) => {
	return (
		<div className='bg-blue-200 p-6 rounded-lg shadow-lg'>
			<div className='flex items-center space-x-4'>
				<img
					className='w-16 h-16 rounded-full'
					src={avatarUrl}
					alt={firstName}
				/>
				<div>
					<p className='text-2xl font-semibold'>
						{firstName} {lastName}
					</p>
					<p className='text-gray-600'>{email}</p>
				</div>
			</div>
		</div>
	);
};
export const Home = () => {
	const sdk = useSDK();
	const cma = useCMA();
	const getSpace = useCallback(async () => {
		return await cma.space.get({});
	}, [cma]);

	const {avatarUrl, email, firstName, lastName} = sdk.user;

	const {result} = useAsync(getSpace, []);

	return (
		<div className='min-h-screen bg-gray-100 flex items-center justify-center'>
			<section className='bg-white rounded-lg shadow-lg p-6 space-y-4'>
				<h1 className='text-3xl font-semibold text-center'>
					My Dashboard
				</h1>
				<ProfileCard
					avatarUrl={avatarUrl}
					firstName={firstName}
					lastName={lastName}
					email={email}
				/>
			</section>
		</div>
	);
};

export default Home;
