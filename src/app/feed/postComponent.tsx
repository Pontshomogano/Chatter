"use client";
import { Row, Container, Col, Button, Tabs, Tab, Card } from "react-bootstrap";
import Styles from "../_styles/Feed/PostComponent.module.scss";
import { FaPen } from "react-icons/fa";
import Image from "next/image";
import { SlBookOpen } from "react-icons/sl";
import { useState } from "react";

// This is the post component that goes on the Feed page and the Analytics page
const PostComponent = () => {
	const [height, setHeight] = useState<number>(0); // State to store calculated height

	const handleLoadComplete = (img: any) => {
		const newHeight =
			img.naturalHeight * (img.clientWidth / img.naturalWidth);
		setHeight(newHeight);
	};

	return (
		<Card className={`${Styles.card}`}>
			<Card.Body className={`${Styles.cardBodyUserinfo}`}>
				<div className={`${Styles.imageDiv}`}>
					<Image
						className={`${Styles.image}`}
						src="/writeSectionImage1.jpg"
						width={100}
						height={100}
						alt="Picture of the author"
					/>
				</div>

				<div className={`${Styles.detailsDiv}`}>
					<h6>Grace Ikpang</h6>
					<p>
						Product manager .<span>May 25th, 2023</span>
					</p>
				</div>
			</Card.Body>

			<Card.Body className={`${Styles.cardBodyPostDetails}`}>
				<Card.Title className={`${Styles.cardBodyPostDetailsTitle}`}>
					Starting out as a Product designer
				</Card.Title>
				<Card.Text>
					<SlBookOpen /> 10 mins read{" "}
				</Card.Text>
				<Card.Text>
					Some quick example text to build on the card title and make
					up the bulk of the card&apos;s content.
				</Card.Text>

				<Image
					className={`${Styles.postThumbnail}`}
					src="/postthumbnailImage.jpg"
					width={400}
					height={height}
					onLoadingComplete={handleLoadComplete}
					alt="Picture of the author"
				/>
			</Card.Body>
		</Card>
	);
};

export default PostComponent;
