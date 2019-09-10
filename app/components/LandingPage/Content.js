import React from 'react';

import './Content.css';

export default ({ changeToLearnPage, changeToRegisterPage }) => {
	return (
		<div className="content-bg">

			<div className="row row-1">
				<div className="container">
					<div className="row">
						<div className="col-md-1"></div>
						<div className="col-xs-12 col-md-10 column-1">
							<h3>Using MemoryFiler</h3>
							<p>See this quick video of how easy it is to build memory palaces using MemoryFiler:</p>
							<iframe id="memfilershort" src="https://www.youtube.com/embed/iQXyLd94LmQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
							{/* <p>Memory Filer is designed to build your own collection of memories in a manner that is more creative and effective than rote repetition.</p> */}
							<button onClick={changeToRegisterPage} className="btn btn-lg action-btn">Sign Up It's Free!</button>
						</div>
						<div className="col-md-1"></div>

					</div>
				</div>
			</div>

			{/* <div className="row row-2">
				<div className="col-xs-12 col-md-6">
					<video id="landing-video" width="100%" muted autoPlay loop>
						<source src="/static/assets/memoryfilerlanding.mp4" type="video/mp4" />
					</video>
				</div>
				<div className="col-xs-12 col-md-6 column-2">
					<ul>
						<li>Use a memory technique that is embraced by memory athletes worldwide.</li>
						<li>Memorize more efficiently by using spatial awareness.</li>
						<li>Create an effective memory recall system. Meaning it's easier to remember what you are trying to memorize.</li>
					</ul>
				</div>

			</div> */}


			<div className="row row-3">
				<div className="col-md-6 landing-white-logo-bg">
					<div className="relative-container">
						{/* <div className="whiteoverlay"> */}
						<iframe width="560" height="315" src="https://www.youtube.com/embed/mh9B5UJbbRg" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
						{/* <ol className="landing-steps-ol">
								<h3>What is MemoryFiler</h3>
								<p className="simple-phrase"><i>MemoryFiler is simply a web application where you can create memory palaces by uploading images.</i></p>
								<p>Using our simple menu system, it's easy to create a memory palace. You can create a palace from an image you find online - or even one you draw yourself. The same process can be applied when you create your memory pegs or objects inside your palace. You have the ability to describe each one with as much detail as needed, allowing you to properly rehearse what you want to memorize.</p>
							</ol> */}
						{/* </div> */}
						{/* <img src="/static/assets/memfilerland.png"></img> */}
					</div>
				</div>
				<div className="col-md-4">
					<h3>What are memory palaces?</h3>
					<p>Watch this video to see how simple memory palces are.</p>
					<p>MemoryFiler makes this process easy and fast by having access to images from the web.</p>
					<p>Simply do a google search for whatever comes to mind, download the image to your computer and then upload into your memory palace!</p>
				</div>
			</div>

		</div>
	)
}