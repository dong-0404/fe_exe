import './ContactPage.css'

export const ContactPage = () => {
    return (
        <div className="contact-page">
            {/* Hero Section */}
            <section className="contact-hero">
                <div className="container">
                    <h1 className="contact-title">Liên hệ về TutorLink</h1>
                </div>
            </section>

            {/* Contact Info Section */}
            <section className="contact-info-section">
                <div className="container">
                    <div className="row g-4">
                        {/* Column 1: For Parents & Students */}
                        <div className="col-lg-6">
                            <div className="contact-card">
                                <h2 className="contact-card-title">Dành cho Phụ huynh & Học sinh</h2>
                                <div className="contact-details">
                                    <h3 className="contact-subtitle">Thông tin liên hệ:</h3>
                                    <div className="contact-items">
                                        <p className="contact-item">
                                            <span className="contact-icon">📞</span>
                                            <strong>Hotline/Zalo:</strong> 0963069400
                                        </p>
                                        <p className="contact-item">
                                            <span className="contact-icon">✉️</span>
                                            <strong>Email:</strong> tutorlink@gmail.com
                                        </p>
                                        <p className="contact-item">
                                            <span className="contact-icon">📍</span>
                                            <strong>Địa chỉ:</strong> Số 6 ngõ 15 Vương Thừa Vũ, Thanh Xuân, Hà Nội
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: For Tutors */}
                        <div className="col-lg-6">
                            <div className="contact-card">
                                <h2 className="contact-card-title">Dành cho Gia sư</h2>
                                <div className="contact-details">
                                    <h3 className="contact-subtitle">Thông tin liên hệ:</h3>
                                    <div className="contact-items">
                                        <p className="contact-item">
                                            <span className="contact-icon">📞</span>
                                            <strong>Hotline/Zalo:</strong> 0963069400
                                        </p>
                                        <p className="contact-item">
                                            <span className="contact-icon">✉️</span>
                                            <strong>Email:</strong> tutorlink@gmail.com
                                        </p>
                                        <p className="contact-item">
                                            <span className="contact-icon">📍</span>
                                            <strong>Địa chỉ:</strong> Số 6 ngõ 15 Vương Thừa Vũ, Thanh Xuân, Hà Nội
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="map-section">
                <div className="container">
                    <h2 className="map-title">Trung tâm Gia sư TutorLink</h2>
                    <div className="map-container">
                        {/* Google Maps iframe - Replace with actual location */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.0661753811547!2d105.80493931540163!3d20.99073618600315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acba0e3db901%3A0x463106e6f0c1f8d4!2zVsaw4budbmcgVGjhu6dhIFbFqSwgVGhhbmggWHXDom4sIEjDoCBO4buZaSwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="TutorLink Location"
                        ></iframe>
                    </div>
                </div>
            </section>
        </div>
    )
}
