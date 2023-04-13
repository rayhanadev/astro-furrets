import React from 'react';

import { authUser } from '@libs/useReplAuth';

const Login = () => {
	return (
		<button
			className="bg-background-dimmer border border-outline-dimmest outline-none active:bg-background-dimmest active:border-outline-default focus:bg-background-dimmest focus:border-outline-default px-4 py-2 my-2 rounded-lg cursor-pointer"
			onClick={() => authUser()}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 793.8 871.5"
				className="inline mr-2 -mt-1 w-6 h-6"
			>
				<style>{'.st0{fill:#f5640c}'}</style>
				<path
					className="st0"
					d="M396.9 356.1H227.2c-16.6 0-30-13.4-30-30v-99.8c0-16.6 13.4-30 30-30h139.7c16.6 0 30 13.4 30 30v129.8zM566.6 515.8H396.9V356.1h169.7c16.5 0 29.9 13.4 29.9 29.9v99.8c0 16.6-13.4 30-29.9 30zM366.9 675.6H227.2c-16.5 0-29.9-13.4-29.9-29.9v-99.8c0-16.5 13.4-29.9 29.9-29.9h169.7v129.8c0 16.3-13.4 29.8-30 29.8z"
				/>
			</svg>
			Login with Replit
		</button>
	);
};

export default Login;
