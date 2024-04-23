from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from .db import db, add_prefix_for_prod, environment, SCHEMA

class ProductImage(db.Model):
    __tablename__ = 'product_images'


    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    url = Column(String(255), nullable=False)
    preview = Column(Boolean, default=False, nullable=False)


    product = relationship("Product", back_populates="images")

    def to_dict(self):
        return {
            "id": self.id,
            "productId": self.product_id,
            "url": self.url,
            "preview": self.preview
        }

    def __repr__(self):
        return f"<ProductImage {self.id} -- product={self.product_id}>"
