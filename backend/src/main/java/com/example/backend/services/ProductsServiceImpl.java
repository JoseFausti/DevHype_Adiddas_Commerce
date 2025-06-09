package com.example.backend.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dtos.productVariants.CreateUpdateProductVariantDTO;
import com.example.backend.dtos.products.CreateUpdateProductDTO;
import com.example.backend.dtos.products.ProductDTO;
import com.example.backend.mappers.ProductMapper;
import com.example.backend.models.entities.Categories;
import com.example.backend.models.entities.Colors;
import com.example.backend.models.entities.Discounts;
import com.example.backend.models.entities.ProductVariants;
import com.example.backend.models.entities.Products;
import com.example.backend.models.entities.Sizes;
import com.example.backend.repositories.BaseRepository;
import com.example.backend.repositories.CategoriesRepository;
import com.example.backend.repositories.ColorsRepository;
import com.example.backend.repositories.DiscountsRepository;
import com.example.backend.repositories.ProductsRepository;
import com.example.backend.repositories.SizesRepository;

import jakarta.transaction.Transactional;
import javafx.scene.paint.Color;

@Service
public class ProductsServiceImpl extends BaseServiceImpl<Products, Long> implements ProductsService {
    
    @Autowired
    private ProductsRepository productsRepository;

    @Autowired
    private CategoriesRepository categoryRepository;

    @Autowired
    private DiscountsRepository discountRepository;

    @Autowired
    private SizesRepository sizeRepository;

    @Autowired
    private ColorsRepository colorRepository;
    

    public ProductsServiceImpl(BaseRepository<Products, Long> baseRepository) {
        super(baseRepository);
    }

    @Transactional
    public ProductDTO getById(Long id) throws Exception {
        Products product = super.findById(id); 
        return ProductMapper.toDto(product);
    }

    @Transactional
    public List<ProductDTO> getAll() throws Exception {
        List<Products> products = super.findAll();
        return products.stream().map(ProductMapper::toDto).toList();
    }

    @Transactional
    public ProductDTO save(CreateUpdateProductDTO dto) throws Exception {
        Products product = new Products();

        product.setName(dto.getName());
        product.setImage(dto.getImage());
        product.setDescription(dto.getDescription());
        product.setBrand(dto.getBrand());
        product.setPrice(dto.getPrice());

        Categories category = categoryRepository.findById(dto.getCategoryId())
            .orElseThrow(() -> new Exception("Category not found"));
        product.setCategory(category);

        if (dto.getDiscountIds() != null && !dto.getDiscountIds().isEmpty()) {
            List<Discounts> discounts = discountRepository.findAllById(dto.getDiscountIds());
            product.setDiscounts(discounts);
        } else {
            product.setDiscounts(new ArrayList<>());
        }

        if (dto.getProductVariants() != null && !dto.getProductVariants().isEmpty()) {
            List<ProductVariants> variants = new ArrayList<>();
            for (CreateUpdateProductVariantDTO variantDTO : dto.getProductVariants()) {
                ProductVariants variant = new ProductVariants();

                Sizes size = sizeRepository.findById(variantDTO.getSizeId())
                    .orElseThrow(() -> new Exception("Size not found"));
                Colors color = colorRepository.findById(variantDTO.getColorId())
                    .orElseThrow(() -> new Exception("Color not found"));

                variant.setSize(size);
                variant.setColor(color);
                variant.setStock(variantDTO.getStock());
                variant.setProduct(product); // para la relación bidireccional

                variants.add(variant);
            }
            product.setProductVariants(variants);
        } else {
            product.setProductVariants(new ArrayList<>());
        }

        product = productsRepository.save(product);

        return ProductMapper.toDto(product);
    }


    @Transactional
    public ProductDTO update(CreateUpdateProductDTO dto, Long id) throws Exception {
        Products product = productsRepository.findById(id)
            .orElseThrow(() -> new Exception("Product not found"));

        product.setName(dto.getName());
        product.setImage(dto.getImage());
        product.setDescription(dto.getDescription());
        product.setBrand(dto.getBrand());
        product.setPrice(dto.getPrice());

        Categories category = categoryRepository.findById(dto.getCategoryId())
            .orElseThrow(() -> new Exception("Category not found"));
        product.setCategory(category);

        if (dto.getDiscountIds() != null && !dto.getDiscountIds().isEmpty()) {
            List<Discounts> discounts = discountRepository.findAllById(dto.getDiscountIds());
            product.setDiscounts(discounts);
        } else {
            product.setDiscounts(new ArrayList<>());
        }

        // Actualizar variantes: por simplicidad, borramos las viejas y ponemos las nuevas
        product.getProductVariants().clear();

        if (dto.getProductVariants() != null && !dto.getProductVariants().isEmpty()) {
            List<ProductVariants> variants = new ArrayList<>();
            for (CreateUpdateProductVariantDTO variantDTO : dto.getProductVariants()) {
                ProductVariants variant = new ProductVariants();

                Sizes size = sizeRepository.findById(variantDTO.getSizeId())
                    .orElseThrow(() -> new Exception("Size not found"));
                Colors color = colorRepository.findById(variantDTO.getColorId())
                    .orElseThrow(() -> new Exception("Color not found"));

                variant.setSize(size);
                variant.setColor(color);
                variant.setStock(variantDTO.getStock());
                variant.setProduct(product);

                variants.add(variant);
            }
            product.setProductVariants(variants);
        }

        product = productsRepository.save(product);

        return ProductMapper.toDto(product);
    }


}
