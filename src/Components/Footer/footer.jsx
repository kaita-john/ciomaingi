const Footer = () => {

    return (

        <footer id="footer">
            {/* top footer  */}
            <div className="section">
                {/* container  */}
                <div className="container">
                    {/* row  */}

                    <div className="row"
                         style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>

                        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '5px'}}>
                            <a href="YOUR_YOUTUBE_LINK" target="_blank" rel="noopener noreferrer" style={{
                                color: '#FFFFFF',
                                margin: '0 15px',
                                fontSize: '18px',
                                transition: 'color 0.3s ease'
                            }} onMouseOver={(e) => e.target.style.color = '#00BFFF'}
                               onMouseOut={(e) => e.target.style.color = '#FFFFFF'}>
                                <i className="fa fa-youtube"></i>
                            </a>
                            <a href="YOUR_FACEBOOK_LINK" target="_blank" rel="noopener noreferrer" style={{
                                color: '#FFFFFF',
                                margin: '0 15px',
                                fontSize: '18px',
                                transition: 'color 0.3s ease'
                            }} onMouseOver={(e) => e.target.style.color = '#1877F2'}
                               onMouseOut={(e) => e.target.style.color = '#FFFFFF'}>
                                <i className="fa fa-facebook"></i>
                            </a>
                            <a href="https://www.instagram.com/cio_maingi_candles/" target="_blank" rel="noopener noreferrer" style={{
                                color: '#FFFFFF',
                                margin: '0 15px',
                                fontSize: '18px',
                                transition: 'color 0.3s ease'
                            }} onMouseOver={(e) => e.target.style.color = '#E4405F'}
                               onMouseOut={(e) => e.target.style.color = '#FFFFFF'}>
                                <i className="fa fa-instagram"></i>
                            </a>
                            <a href="YOUR_TWITTER_LINK" target="_blank" rel="noopener noreferrer" style={{
                                color: '#FFFFFF',
                                margin: '0 15px',
                                fontSize: '18px',
                                transition: 'color 0.3s ease'
                            }} onMouseOver={(e) => e.target.style.color = '#1DA1F2'}
                               onMouseOut={(e) => e.target.style.color = '#FFFFFF'}>
                                <i className="fa fa-twitter"></i>
                            </a>
                        </div>

                        <div style={{marginBottom: '10px'}}>
                            <a href="#" style={{
                                color: '#E0E0E0',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <i className="fa fa-map-marker" style={{marginRight: '8px'}}></i> Tom Mboya Strt,
                                Platinum Plaza, 3rd Floor Room 305 @ Shelves.254
                            </a>
                        </div>

                        <p style={{color: '#9E9E9E', marginTop: '0px', marginBottom: '0px'}}>&copy; Copyright 2025 ||
                            All Rights Reserved</p>

                    </div>
                    {/* /row  */}
                </div>
                {/* /container  */}
            </div>
            {/* /top footer  */}

        </footer>
    )
}

export default Footer