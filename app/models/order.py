from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .db import db, add_prefix_for_prod,environment,SCHEMA

class Order(db.Model):
    __tablename__ = 'orders'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    cart_id = Column(Integer, ForeignKey(add_prefix_for_prod('cart.id')), nullable=False)
    status = Column(String(255), nullable=False)
    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship('User', back_populates='orders')
    cart = relationship('Cart', back_populates='orders')
    product_orders = relationship('ProductOrder', back_populates='order')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'cart_id': self.cart_id,
            'status': self.status,
            'products':{product.product_id:product.from_order() for product in self.product_orders},
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
    def __repr__(self):
        return f"<Order {self.id} -- user={self.user_id}>"
