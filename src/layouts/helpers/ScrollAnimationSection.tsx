import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

const ScrollAnimationSection = () => {
	return (
		<div>
			<span className="absolute left-0 top-1/2 -z-10 opacity-5 dark:invert md:opacity-100">
				<ScrollAnimation
					animateIn="triggerAnimation"
					duration={0}
					delay={50}
					animateOnce={true}
				>
					<svg
						className="animate-svg"
						width="161"
						height="50"
						viewBox="0 0 161 50"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M158 43.4387L142.61 46.7689C140.228 47.3239 132.716 48.5125 142.06 27.8978C144.289 22.9811 141.181 16.6862 124.472 20.6825C114.212 22.9026 93.1418 28.1151 84.8972 30.1965C77.7518 32.0003 58.5142 37.9669 48.6206 40.6638L43.6738 41.7738C40.3759 42.4071 35.4291 42.4071 41.4752 32.8933C47.4123 23.551 55.9492 11.0621 59.0638 5.69686C60.3463 3.66174 60.1631 0.81259 49.1702 5.69686C38.1773 10.5811 13.8097 19.9428 3 24.0131"
							stroke="black"
							strokeWidth="5"
							strokeLinecap="round"
						/>
					</svg>
				</ScrollAnimation>
			</span>
			<span className="absolute top-1/2 right-0 -z-10 opacity-5 dark:invert md:opacity-100">
				<ScrollAnimation
					animateIn="triggerAnimation"
					duration={0}
					delay={50}
					animateOnce={true}
				>
					<svg
						className="animate-svg"
						width="167"
						height="73"
						viewBox="0 0 167 73"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M3.40968 32.3777C18.9185 17.6749 58.1541 -7.83218 91.0255 7.76112C95.8535 10.0332 107.5 17.4991 115.464 29.1862C119.671 34.7333 126.526 48.6871 120.287 60.1254C116.456 66.9165 101.635 75.3036 94.9378 64.9905C92.4958 61.2298 91.6035 53.0465 99.8305 44.544C104.919 39.2852 111.327 34.9017 117.382 32.487C124.848 29.5099 136.743 26.996 164.042 30.6427"
							stroke="black"
							strokeWidth="5"
							strokeLinecap="round"
						/>
					</svg>
				</ScrollAnimation>
			</span>
		</div>
	)
}

export default ScrollAnimationSection