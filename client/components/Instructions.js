import Particles from 'react-particles-js';
import React from 'react';

const InstructionsToggle = (props) => {
	const { showDirections, enableOutline, showInstructions } = props;
	return (
		<div>
			{showInstructions ? (
				<div
					style={{
						textAlign: 'center',
						fontSize: '15px',
						fontFamily: 'Source Code Pro, monospace',
						marginTop: '1%'
					}}
				>
					<button
						type='button'
						className={enableOutline ? 'home-btn' : 'no-outline-on-focus home-btn'}
						onClick={showDirections}
						style={{ textAlign: 'center', marginTop: '1%', fontSize: '12px' }}
					>
						close instructions
					</button>
					<h4>“One band. One Sound.”</h4>
					<p>
						You have the unique opportunity to collaborate in realtime with other
						musicians
					</p>
					<p>Click a sound object Once to hear its sound.</p>
					<p>Click and Drag a sound object onto the Jam-Space</p>
					<p>When the Hammer strikes it, hear the sounds!</p>
					<p>
						Exlore the music you can create with your friends or match with users from
						around the world.
					</p>
				</div>
			) : (
				<button
					type='button'
					className={enableOutline ? 'home-btn' : 'no-outline-on-focus home-btn'}
					onClick={showDirections}
					style={{ textAlign: 'center', marginTop: '1%', fontSize: '12px' }}
				>
					view instructions
				</button>
			)}
		</div>
	);
};

export default InstructionsToggle;
