import React from "react";
import Layout from "../components/Layout";
import ContentBlock from "../components/ContentBlock";
import BannerCarousel from "../components/Carousel";
import ContentTextImage from "../components/ContentTextImage";
import Stocklist from "../components/Stocklist";
import TextHeader from "../components/TextHeader";
import TextParagraph from "../components/TextParagraph";
import MainButton from "../components/MainButton";
import ProductCard from "../components/ProductCard";
import TriSection from "../components/TriSection";
import { motion } from "framer-motion";
import bannerImage1 from "../images/hero/banner1.jpg";
import bannerImage2 from "../images/hero/banner2.jpg";
import bannerImage3 from "../images/hero/banner5.jpg";
import trial1 from "../images/about_us/trial1.png";
import inputData from "../pagesInput/index";
import ProductInputData from "../pagesInput/ProductCard";

function IndexPage() {
  const { aboutMeParagraphArray, blogSectionTitle } = inputData;
  const { productArray } = ProductInputData;

  const banners = [bannerImage1, bannerImage2, bannerImage3];

  return (
    <Layout>
      {/* Responsive Carousel */}
      <BannerCarousel banners={banners} />

      {/* Authorized Stocklist Section */}
      <ContentBlock>
        <Stocklist />
      </ContentBlock>

      {/* About Us Section */}
      <ContentBlock color>
        <TextHeader mainHeader="About Us" />
        <ContentTextImage image={trial1.src} paragraphs={aboutMeParagraphArray}>
          <TextParagraph paragraphs={aboutMeParagraphArray} />
          <MainButton label="Read more" primary href="/about-us/" />
        </ContentTextImage>
      </ContentBlock>

      {/* Featured Products Section */}
      <ContentBlock>
        <TextHeader size="large" mainHeader={blogSectionTitle} />
        <TriSection noCards={4} xtraWide>
          {productArray.slice(0, 8).map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.1 }}
            >
              <ProductCard
                blogInfo={product}
                image={product.image} // Ensure 'product.image' exists
              />
            </motion.div>
          ))}
        </TriSection>
      </ContentBlock>
    </Layout>
  );
};

export default IndexPage;
