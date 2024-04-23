from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from .db import db, add_prefix_for_prod,environment,SCHEMA

class ProductOrder(db.Model):
    __tablename__ = 'product_orders'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    order_id = Column(Integer, ForeignKey(add_prefix_for_prod('orders.id')), primary_key=True)
    product_id = Column(Integer, ForeignKey(add_prefix_for_prod('products.id')), primary_key=True)
    quantity = Column(Integer, nullable=False)
    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


    order = relationship('Order', back_populates='product_orders')
    product = relationship('Product', back_populates='product_orders')

    def to_dict(self):
        return {
            'order_id': self.order_id,
            'product_id': self.product_id,
            'quantity': self.quantity,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
    def from_order(self):
        return {
            "productId": self.product_id,
            "quantity": self.quantity
        }

    def __repr__(self):
        return f"<ProductOrder on Order {self.order_id} for {self.quantity} of Product {self.product_id}>"
