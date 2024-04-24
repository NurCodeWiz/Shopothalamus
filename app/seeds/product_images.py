
from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_product_images():
    product_images_data = {
        "productImage1" : ProductImage(
            product_id=1,
            url="https://nurawsbucket.s3.amazonaws.com/71DHg59-StL._AC_SX679_.jpg",
            preview=True
        ),
        "productImage2" : ProductImage(
            product_id=1,
            url="https://nurawsbucket.s3.amazonaws.com/71ZwNjMMG8L._AC_SX679_.jpg",
            preview=False
        ),
        "productImage3" : ProductImage(
            product_id=1,
            url="https://nurawsbucket.s3.amazonaws.com/71gf23CFSaL._AC_SX679_.jpg",
            preview=False
        ),
        "productImage4" : ProductImage(
            product_id=2,
            url="https://nurawsbucket.s3.amazonaws.com/41A%2Beuu5aaL._AC_.jpg",
            preview=True
        ),
        "productImage5" : ProductImage(
            product_id=2,
            url="https://nurawsbucket.s3.amazonaws.com/41SQJcDDOCL._AC_SX679_.jpg",
            preview=False
        ),
        "productImage6" : ProductImage(
            product_id=2,
            url="https://nurawsbucket.s3.amazonaws.com/51NdfhqdnIL._AC_.jpg",
            preview=False
        ),
        "productImage7" : ProductImage(
            product_id=3,
            url="https://nurawsbucket.s3.amazonaws.com/51izt0Hzw5L._AC_SX679_.jpg",
            preview=True
        ),
        "productImage8" : ProductImage(
            product_id=3,
            url="https://nurawsbucket.s3.amazonaws.com/71rwqlFzqyL._AC_SL1500_.jpg",
            preview=False
        ),
        "productImage9" : ProductImage(
            product_id=3,
            url="https://nurawsbucket.s3.amazonaws.com/31JVtn1rFRL._AC_US100_.jpg",
            preview=False
        ),
        "productImage10" : ProductImage(
            product_id=4,
            url="https://nurawsbucket.s3.amazonaws.com/61e592E6PqL._AC_SX679_.jpg",
            preview=True
        ),
        "productImage11" : ProductImage(
            product_id=4,
            url="https://nurawsbucket.s3.amazonaws.com/71F0U12YwfL._AC_SX679_.jpg",
            preview=False
        ),
        "productImage12" : ProductImage(
            product_id=4,
            url="https://nurawsbucket.s3.amazonaws.com/61MgfyKFg%2BL._AC_SL1500_.jpg",
            preview=False
        ),
        "productImage13" : ProductImage(
            product_id=5,
            url="https://nurawsbucket.s3.amazonaws.com/714dK%2BuZTUL._AC_SY300_SX300_.jpg",
            preview=True
        ),
        "productImage14" : ProductImage(
            product_id=5,
            url="https://nurawsbucket.s3.amazonaws.com/71F0U12YwfL._AC_SX679_.jpg",
            preview=False
        ),
        "productImage15" : ProductImage(
            product_id=5,
            url="https://nurawsbucket.s3.amazonaws.com/6107qm4gl0L._AC_SL1500_.jpg",
            preview=False
        ),
        "productImage16" : ProductImage(
            product_id=6,
            url="https://nurawsbucket.s3.amazonaws.com/71K2%2BmHG%2B7L._AC_SL1500_.jpg",
            preview=True
        ),
        "productImage17" : ProductImage(
            product_id=6,
            url="https://nurawsbucket.s3.amazonaws.com/71DHg59-StL._AC_SX679_.jpg",
            preview=False
        ),
        "productImage18" : ProductImage(
            product_id=6,
            url="https://nurawsbucket.s3.amazonaws.com/61VHKn6zlBL._AC_SX679_.jpg",
            preview=False
        ),
        "productImage19" : ProductImage(
            product_id=7,
            url="https://nurawsbucket.s3.amazonaws.com/71PpjQ4t9wL._AC_SX679_.jpg",
            preview=True
        ),
        "productImage20" : ProductImage(
            product_id=7,
            url="https://nurawsbucket.s3.amazonaws.com/71LkG7h9-ML._AC_SX679_.jpg",
            preview=False
        ),
        "productImage21" : ProductImage(
            product_id=8,
            url="https://nurawsbucket.s3.amazonaws.com/71i1zax59rL._AC_SL1500_.jpg",
            preview=True
        ),
        "productImage22" : ProductImage(
            product_id=8,
            url="https://nurawsbucket.s3.amazonaws.com/A140RmwGvJL._AC_SX679_.jpg",
            preview=False
        ),
        "productImage23" : ProductImage(
            product_id=9,
            url="https://nurawsbucket.s3.amazonaws.com/61me6XFUHlL.__AC_SX300_SY300_QL70_FMwebp_.webp",
            preview=True
        ),
        "productImage24" : ProductImage(
            product_id=10,
            url="https://nurawsbucket.s3.amazonaws.com/31%2BUAJH7UiL.jpeg",
            preview=True
        ),
        "productImage25" : ProductImage(
            product_id=11,
            url="https://nurawsbucket.s3.amazonaws.com/71SfDbMsSvS._AC_SL1500_.jpg",
            preview=True
        ),
        "productImage26" : ProductImage(
            product_id=11,
            url="https://nurawsbucket.s3.amazonaws.com/81Gs1pEjxiL.__AC_SY300_SX300_QL70_FMwebp_.webp",
            preview=False
        ),
        "productImage27" : ProductImage(
            product_id=12,
            url="https://nurawsbucket.s3.amazonaws.com/61ShLAfZaEL._AC_SX679_.jpg",
            preview=True
        ),
        "productImage28" : ProductImage(
            product_id=12,
            url="https://nurawsbucket.s3.amazonaws.com/31zWHWBb25L._AC_SL1000_.jpg",
            preview=False
        ),
        "productImage29" : ProductImage(
            product_id=13,
            url="https://nurawsbucket.s3.amazonaws.com/61bL3bcaoeL._AC_SL1000_.jpg",
            preview=True
        ),
        "productImage30" : ProductImage(
            product_id=14,
            url="https://nurawsbucket.s3.amazonaws.com/51M%2BqQwzrdL._AC_SY300_SX300_.jpg",
            preview=True
        ),
        "productImage31" : ProductImage(
            product_id=15,
            url="https://nurawsbucket.s3.amazonaws.com/81L-JzfAsdL._AC_SX679_.jpg",
            preview=True
        ),
        "productImage32" : ProductImage(
            product_id=16,
            url="https://nurawsbucket.s3.amazonaws.com/A1xlwUXvbCL._AC_SX679_.jpg",
            preview=True
        ),
        "productImage33" : ProductImage(
            product_id=17,
            url="https://nurawsbucket.s3.amazonaws.com/APL4J2D3LLA-pimid82099-xl.jpeg",
            preview=True
        ),
        "productImage34" : ProductImage(
            product_id=18,
            url="https://nurawsbucket.s3.amazonaws.com/61CPXHLLQEL._AC_SX679_.jpg",
            preview=True
        ),
        "productImage35" : ProductImage(
            product_id=19,
            url="https://nurawsbucket.s3.amazonaws.com/81qbNi2CrQL.__AC_SX300_SY300_QL70_FMwebp_.webp",
            preview=True
        ),
        "productImage36" : ProductImage(
            product_id=20,
            url="https://nurawsbucket.s3.amazonaws.com/713CYpwwXxL._AC_SL1200_.jpg",
            preview=True
        ),
        "productImage37" : ProductImage(
            product_id=21,
            url="https://nurawsbucket.s3.amazonaws.com/81ReBJeexdL._AC_SX679_.jpg",
            preview=True
        ),
        "productImage38" : ProductImage(
            product_id=22,
            url="https://nurawsbucket.s3.amazonaws.com/lander-u-desk_obsidian-oak_black_hero_thumbnail.png",
            preview=True
        ),
        "productImage39" : ProductImage(
            product_id=23,
            url="https://nurawsbucket.s3.amazonaws.com/91hbaduXgQL._AC_SL1500_.jpg",
            preview=True
        ),
        "productImage40" : ProductImage(
            product_id=23,
            url="https://nurawsbucket.s3.amazonaws.com/81U7QuJW5vL._AC_SL1500_.jpg",
            preview=False
        ),
        "productImage41" : ProductImage(
            product_id=24,
            url="https://nurawsbucket.s3.amazonaws.com/61KYPVLlNeL._AC_SL1500_.jpg",
            preview=True
        ),
        "productImage42" : ProductImage(
            product_id=24,
            url="https://nurawsbucket.s3.amazonaws.com/41obBXoAXmL._AC_.jpg",
            preview=False
        ),
        "productImage43" : ProductImage(
            product_id=25,
            url="https://nurawsbucket.s3.amazonaws.com/71UJKXkQRvL.__AC_SX300_SY300_QL70_FMwebp_.webp",
            preview=True
        ),
        "productImage44" : ProductImage(
            product_id=25,
            url="https://nurawsbucket.s3.amazonaws.com/71wQMnsjm9L._AC_SX679_.jpg",
            preview=False
        ),
        "productImage45" : ProductImage(
            product_id=26,
            url="https://nurawsbucket.s3.amazonaws.com/3(11).jpeg",
            preview=True
        ),
        "productImage46" : ProductImage(
            product_id=27,
            url="https://nurawsbucket.s3.amazonaws.com/workplace-reimagined.webp",
            preview=True
        ),
        "productImage47" : ProductImage(
            product_id=28,
            url="https://nurawsbucket.s3.amazonaws.com/71A-M7ZJx7L._AC_SX679_.jpg",
            preview=True
        ),
        "productImage48" : ProductImage(
            product_id=28,
            url="https://nurawsbucket.s3.amazonaws.com/71I6waW0INL._AC_SL1500_.jpg",
            preview=False
        ),
        "productImage49" : ProductImage(
            product_id=29,
            url="https://nurawsbucket.s3.amazonaws.com/51qWENRoxUL.__AC_SX300_SY300_QL70_FMwebp_.webp",
            preview=True
        ),
        "productImage50" : ProductImage(
            product_id=29,
            url="https://nurawsbucket.s3.amazonaws.com/61gydEEfLBL._AC_SX679_.jpg",
            preview=False
        ),
        "productImage51" : ProductImage(
            product_id=30,
            url="https://nurawsbucket.s3.amazonaws.com/61gydEEfLBL._AC_SX679_.jpg",
            preview=True
        ),
        "productImage52" : ProductImage(
            product_id=30,
            url="https://nurawsbucket.s3.amazonaws.com/44cac8a4_TimeFlip2_brainstorm_3df90442-036d-497d-8f7f-e097701cb47d_1000x.webp",
            preview=False
        ),
        "productImage53" : ProductImage(
            product_id=31,
            url="https://nurawsbucket.s3.amazonaws.com/71xK5Ym6cyL.__AC_SX300_SY300_QL70_FMwebp_.webp",
            preview=True
        ),
        "productImage54" : ProductImage(
            product_id=32,
            url="https://nurawsbucket.s3.amazonaws.com/619I2WuzOxL._AC_SL1000_.jpg",
            preview=True
        ),
        "productImage55" : ProductImage(
            product_id=32,
            url="https://nurawsbucket.s3.amazonaws.com/412J2%2BVqhEL._AC_SL1000_.jpg",
            preview=False
        ),
        "productImage56" : ProductImage(
            product_id=33,
            url="https://nurawsbucket.s3.amazonaws.com/81V0xvY33IL._AC_SL1500_.jpg",
            preview=True
        ),
        "productImage57" : ProductImage(
            product_id=34,
            url="https://nurawsbucket.s3.amazonaws.com/712iUesHShL._AC_SL1500_.jpg",
            preview=True
        ),
        "productImage58" : ProductImage(
            product_id=35,
            url="https://nurawsbucket.s3.amazonaws.com/s-l1600.jpeg",
            preview=True
        ),
        "productImage59" : ProductImage(
            product_id=36,
            url="https://nurawsbucket.s3.amazonaws.com/61ukxo--8rL.__AC_SX300_SY300_QL70_FMwebp_.webp",
            preview=True
        ),
        "productImage60" : ProductImage(
            product_id=36,
            url="https://nurawsbucket.s3.amazonaws.com/91d0JYeoPNL._AC_SX679_.jpg",
            preview=False
        ),
        "productImage61" : ProductImage(
            product_id=37,
            url="https://nurawsbucket.s3.amazonaws.com/61xbJD5bMoL._AC_SX679_.jpg",
            preview=True
        ),
        "productImage62" : ProductImage(
            product_id=38,
            url="https://nurawsbucket.s3.amazonaws.com/7182H9bnx1L._AC_SL1500_.jpg",
            preview=True
        ),
        "productImage63" : ProductImage(
            product_id=39,
            url="https://nurawsbucket.s3.amazonaws.com/71MFzcR4g9L._AC_SX679_.jpg",
            preview=False
        ),
        "productImage64" : ProductImage(
            product_id=40,
            url="https://nurawsbucket.s3.amazonaws.com/61CP-O%2BjmFL._AC_SL1500_.jpg",
            preview=True
        )

    }

    for key, product_image in product_images_data.items():
        db.session.add(product_image)


    db.session.commit()




def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;"),
    else:
        db.session.execute(text("DELETE FROM product_images")),

    db.session.commit(),
