package com.example.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.model.Account;
import com.example.model.Cart;
import com.example.model.CartItem;
import com.example.model.Item;
import com.example.repository.CartItemRepository;
import com.example.repository.CartRepository;
import com.example.repository.ItemRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ItemRepository itemRepository;

    // 1. Get Cart (hoặc tạo mới nếu chưa có)
    @Transactional
    public Cart getCartByAccount(Account account) {
        // Tìm Cart theo Account ID
        // Lưu ý: Trong entity Cart, ta đã setup mapping với Account
        // Để tìm được Cart, ta cần tìm Account trước
        // Hoặc nếu CartRepository có method findByAccount(Account account)

        // Cách 1: Dùng method tự định nghĩa trong repository (nếu có)
        Optional<Cart> cartOpt = cartRepository.findByAccount(account);
        if (cartOpt.isPresent()) {
            return cartOpt.get();
        }

        // Cách 2: Nếu chưa có cart, tạo mới
        Cart newCart = new Cart();
        newCart.setAccount(account);
        return cartRepository.save(newCart);
    }

    // 2. Thêm sản phẩm vào giỏ hàng
    @Transactional
    public CartItem addToCart(Long accountId, Long itemId, int quantity) {
        // Lấy Account
        // Lưu ý: Cần phải có AccountService để lấy thông tin Account
        // Giả sử ta có method getAccountById trong AccountService
        // Account account = accountService.getAccountById(accountId);
        // Hoặc nếu ta đang trong context của Security, ta có thể lấy từ SecurityContext
        // Ở đây, để đơn giản, ta giả sử Account đã được truyền vào hoặc lấy được
        Account account = getAccountById(accountId); // Cần implement hoặc truyền vào

        // Lấy Item
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new NoSuchElementException("Item not found with id: " + itemId));

        // Lấy Cart của Account
        Cart cart = getCartByAccount(account);

        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        Optional<CartItem> existingCartItemOpt = cartItemRepository.findByCartAndItem(cart, item);

        if (existingCartItemOpt.isPresent()) {
            // Nếu đã có, cập nhật số lượng
            CartItem existingCartItem = existingCartItemOpt.get();
            existingCartItem.setQuantity(existingCartItem.getQuantity() + quantity);
            return cartItemRepository.save(existingCartItem);
        } else {
            // Nếu chưa có, tạo mới
            CartItem newCartItem = new CartItem();
            newCartItem.setCart(cart);
            newCartItem.setItem(item);
            newCartItem.setQuantity(quantity);
            return cartItemRepository.save(newCartItem);
        }
    }

    // 3. Xóa sản phẩm khỏi giỏ hàng
    @Transactional
    public void removeFromCart(Long accountId, Long itemId) {
        Account account = getAccountById(accountId); // Cần implement
        Cart cart = getCartByAccount(account);
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new NoSuchElementException("Item not found with id: " + itemId));

        Optional<CartItem> cartItemOpt = cartItemRepository.findByCartAndItem(cart, item);
        if (cartItemOpt.isPresent()) {
            cartItemRepository.delete(cartItemOpt.get());
        }
    }

    // 4. Cập nhật số lượng sản phẩm trong giỏ hàng
    @Transactional
    public CartItem updateCartItemQuantity(Long accountId, Long itemId, int quantity) {
        if (quantity <= 0) {
            // Nếu số lượng <= 0, ta có thể xóa sản phẩm khỏi giỏ hàng
            removeFromCart(accountId, itemId);
            return null;
        }

        Account account = getAccountById(accountId); // Cần implement
        Cart cart = getCartByAccount(account);
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new NoSuchElementException("Item not found with id: " + itemId));

        Optional<CartItem> cartItemOpt = cartItemRepository.findByCartAndItem(cart, item);
        if (cartItemOpt.isPresent()) {
            CartItem cartItem = cartItemOpt.get();
            cartItem.setQuantity(quantity);
            return cartItemRepository.save(cartItem);
        } else {
            throw new NoSuchElementException("Cart item not found");
        }
    }

    // 5. Lấy danh sách tất cả các item trong giỏ hàng
    public List<CartItem> getCartItems(Long accountId) {
        Account account = getAccountById(accountId); // Cần implement
        Cart cart = getCartByAccount(account);
        return cart.getCartItems();
    }

    // 6. Xóa toàn bộ giỏ hàng
    @Transactional
    public void clearCart(Long accountId) {
        Account account = getAccountById(accountId); // Cần implement
        Cart cart = getCartByAccount(account);
        cart.getCartItems().clear();
        cartRepository.save(cart);
    }

    // 7. Tính tổng tiền giỏ hàng
    public double getCartTotal(Long accountId) {
        Account account = getAccountById(accountId); // Cần implement
        Cart cart = getCartByAccount(account);

        return cart.getCartItems().stream()
                .mapToDouble(cartItem -> cartItem.getItem().getPrice() * cartItem.getQuantity())
                .sum();
    }

    // Helper method để lấy Account (cần implement)
    private Account getAccountById(Long accountId) {
        // Đây là placeholder. Cần sử dụng AccountService để lấy thông tin Account
        // Ví dụ:
        // return accountService.getAccountById(accountId);
        throw new UnsupportedOperationException("Account service not implemented");
    }
}
