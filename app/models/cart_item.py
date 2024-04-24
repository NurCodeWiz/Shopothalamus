from sqlalchemy import Column, Integer, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .db import db, add_prefix_for_prod,environment,SCHEMA

class CartItem(db.Model):
    __tablename__ = 'cart_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True)
    cart_id = Column(Integer, ForeignKey(add_prefix_for_prod('carts.id')), nullable=False)
    product_id = Column(Integer, ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    quantity = Column(Integer, nullable=False)


    cart = relationship('Cart', back_populates='cart_items')
    product = relationship('Product', back_populates='cart_items')

    def to_dict(self):
        return {
            'id': self.id,
            'cart_id': self.cart_id,
            'product_id': self.product_id,
            'quantity': self.quantity

        }
    def __repr__(self):
        return f"<CartItem {self.id} -- Cart {self.cart_id},  Product {self.product_id}, Quantity {self.quantity}>"
