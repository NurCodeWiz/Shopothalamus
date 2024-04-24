from app.models import db, Product,environment, SCHEMA
from datetime import datetime, timezone
from sqlalchemy.sql import text

def seed_products():
    # Smart Home Automation Products

        product1=Product(provider_id=1, name="Philips Hue Smart Lighting Kit", price=199.99, category="Smart Home Automation Products", description="Complete home lighting system with 16 million colors controlled via mobile app.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product2=Product(provider_id=1, name="Wemo Mini Smart Plug", price=29.99, category="Smart Home Automation Products", description="Compact smart plug with voice control compatibility.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product3=Product(provider_id=1, name="Ecobee SmartThermostat with Voice Control", price=249.00, category="Smart Home Automation Products", description="Energy-efficient thermostat with Alexa built in for voice control.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product4=Product(provider_id=1, name="August Smart Lock Pro", price=229.99, category="Smart Home Automation Products", description="Secure, keyless entry that lets you lock and unlock your door from anywhere.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product5=Product(provider_id=1, name="Nest Protect Smoke + CO Alarm", price=119.99, category="Smart Home Automation Products", description="Smart smoke and carbon monoxide alarm that can be silenced from your phone.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product6=Product(provider_id=1, name="LIFX Smart LED Light Strip", price=89.99, category="Smart Home Automation Products", description="Ultra-bright, color changing light strip that works with Alexa, Google Assistant, and Siri.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product7=Product(provider_id=1, name="TP-Link HS200 Smart Light Switch", price=39.99, category="Smart Home Automation Products", description="Control lights and ceiling fans from anywhere via the Kasa app.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product8=Product(provider_id=1, name="Arlo Ultra 2 Spotlight Camera", price=399.99, category="Smart Home Automation Products", description="Wireless security camera with color night vision and integrated spotlight.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product9=Product(provider_id=1, name="Nest Learning Thermostat", price=249.99, category="Smart Home Automation Products", description="Programs itself to save energy based on your habits and schedule.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product10=Product(provider_id=1, name="Ring Alarm Home Security System", price=199.99, category="Smart Home Automation Products", description="Comprehensive home security system easily expandable to fit your needs.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))


    # Smart Entertainment Products

        product11=Product(provider_id=2, name="Samsung QLED Smart 4K UHD TV", price=1299.99, category="Smart Entertainment Products", description="Stunning 4K TV with Quantum Dot technology for vibrant viewing.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product12=Product(provider_id=2, name="Sonos Beam Smart Soundbar", price=399.99, category="Smart Entertainment Products", description="Compact smart soundbar with voice control and immersive sound.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product13=Product(provider_id=2, name="Amazon Echo Dot (4th Gen)", price=49.99, category="Smart Entertainment Products", description="Compact smart speaker with Alexa to help around your home.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product14=Product(provider_id=2, name="Google Chromecast with Google TV", price=49.99, category="Smart Entertainment Products", description="Stream entertainment in up to 4K HDR with personalized recommendations.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product15=Product(provider_id=2, name="Epson EF-100 Smart Streaming Laser Projector", price=899.99, category="Smart Entertainment Products", description="Ultra-portable laser projector with streaming and built-in Android TV.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product16=Product(provider_id=2, name="Bose Home Speaker 500", price=299.99, category="Smart Entertainment Products", description="Powerful smart speaker with voice control built in and a wide soundstage.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product17=Product(provider_id=2, name="Apple HomePod Mini", price=99.99, category="Smart Entertainment Products", description="Small speaker with big sound and Siri integration for smart home control.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product18=Product(provider_id=2, name="Roku Streaming Stick+", price=59.99, category="Smart Entertainment Products", description="Powerful and portable streaming device with long-range wireless.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product19=Product(provider_id=2, name="LG CineBeam LED Projector", price=649.99, category="Smart Entertainment Products", description="Full HD projector that offers a cinematic experience at home.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product20=Product(provider_id=2, name="JBL Link Portable Wi-Fi Speaker", price=179.99, category="Smart Entertainment Products", description="Portable speaker with Google Assistant, Wi-Fi and Bluetooth streaming.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))


    # Smart Office Products

        product21=Product(provider_id=3, name="Rocketbook Smart Reusable Notebook", price=34.99, category="Smart Office Products", description="Eco-friendly notebook with cloud sync.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product22=Product(provider_id=3, name="iMovR Lander Desk", price=1337.00, category="Smart Office Products", description="Electric standing desk with intuitive height memory settings.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product23=Product(provider_id=3, name="Meeting Owl Pro", price=999.00, category="Smart Office Products", description="360-degree video conferencing device with integrated AI to focus on the speaker.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product24=Product(provider_id=3, name="Cubii Pro Under Desk Elliptical", price=349.00, category="Smart Office Products", description="Stay fit while you sit, smart under-desk elliptical that syncs with your fitness app.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product25=Product(provider_id=3, name="Livescribe Aegir Smartpen", price=99.99, category="Smart Office Products", description="Digitize your notes and audio recordings with this smartpen.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product26=Product(provider_id=3, name="Autonomous SmartDesk 2", price=479.00, category="Smart Office Products", description="Adjustable standing desk with programmable settings for better ergonomics.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product27=Product(provider_id=3, name="Zoho Cliq", price=3.00, category="Smart Office Products", description="Streamline communication with this smart collaboration tool that integrates with your office apps.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product28=Product(provider_id=3, name="Upright GO 2 Posture Trainer", price=99.95, category="Smart Office Products", description="Wearable device that trains you to sit and stand with correct posture.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product29=Product(provider_id=3, name="MOFT Z Sit-Stand Desk", price=59.99, category="Smart Office Products", description="Lightweight, portable, and transforms any table into a standing desk.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product30=Product(provider_id=3, name="TimeFlip 2 Interactive Time Tracker", price=59.00, category="Smart Office Products", description="Innovative and fun way to manage your time with a connected app.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))


    # Smart Pet Products

        product31=Product(provider_id=4, name="Furbo Dog Camera", price=199.00, category="Smart Pet Products", description="Treat-tossing dog camera for pet owners who have to leave their pets at home.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product32=Product(provider_id=4, name="SureFlap Microchip Pet Door", price=149.99, category="Smart Pet Products", description="Microchip-activated pet door that allows your pets in and keeps intruders out.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product33=Product(provider_id=4, name="Whistle GO Explore Pet Tracker", price=129.95, category="Smart Pet Products", description="GPS tracker and fitness monitor for your pet, waterproof and with a built-in night light.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product34=Product(provider_id=4, name="Wickedbone Smart Bone", price=99.99, category="Smart Pet Products", description="Interactive electric gaming device that keeps your pet entertained.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product35=Product(provider_id=4, name="Petnet SmartFeeder", price=179.99, category="Smart Pet Products", description="Automatically feeds your pet the perfect portion every time.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product36=Product(provider_id=4, name="Petcube Bites 2", price=249.00, category="Smart Pet Products", description="Wi-Fi pet camera with treat dispenser and Alexa built-in.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product37=Product(provider_id=4, name="Fi Series 2 Dog Collar", price=149.00, category="Smart Pet Products", description="Smart dog collar with GPS tracking and a fitness monitor.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product38=Product(provider_id=4, name="iFetch Frenzy Mini", price=39.95, category="Smart Pet Products", description="Interactive brain game for small to medium-sized dogs.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product39=Product(provider_id=4, name="PetSafe Smart Feed Automatic Dog and Cat Feeder", price=169.95, category="Smart Pet Products", description="Programmable feeder that lets you schedule up to 12 meals a day.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))
        product40=Product(provider_id=4, name="PetSafe Electronic SmartDoor", price=134.99, category="Smart Pet Products", description="Automatic door that reads the unique signal of the SmartKey worn by your pet.", created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc))



        all_products = [product1, product2, product3, product4, product5, product6, product7, product8, product9,
                    product10, product11, product12, product13, product14, product15, product16, product17,
                    product18, product19, product20, product21, product22, product23, product24, product25,
                    product26, product27, product28, product29, product30, product31, product32, product33,
                    product34, product35, product36, product37, product38, product39, product40]

        _ = [db.session.add(product) for product in all_products]
        db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
