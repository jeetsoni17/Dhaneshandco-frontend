import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Layout from "../components/Layout";
import TextHeader from "../components/TextHeader";
import TextParagraph from "../components/TextParagraph";
import ContentBlock from "../components/ContentBlock";
import ContentText from "../components/ContentText";
import ContentTextImage from "../components/ContentTextImage";
import inputData from "../pagesInput/about-us";
import trial1 from '../images/about_us/trial1.png';

const AboutUs = ({ data }) => {
  const { 
    leadColorHeader, 
    leadMainHeader, 
    leadParagraphs, 
    storyTitle1, 
    storyParagraphs1 
  } = inputData;

  const storyArray = [
    {
      image: data.image1,
      title: storyTitle1,
      paragraphs: storyParagraphs1,
    },
  ];

  return (
    <Layout>
      {/* ******** */}
      {/* Lead Blurb */}
      {/* ******** */}
      <ContentBlock className="d-flex align-items-center py-1">
        <ContentText>
          <TextHeader colorHeader={leadColorHeader} mainHeader={leadMainHeader} />
          <TextParagraph
            paragraphs={leadParagraphs}
            style={{ margin: "0px", paddingBottom: "0px" }}
          />
        </ContentText>
      </ContentBlock>

      <ContentBlock>
        {storyArray.map((item, index) => (
          <ContentTextImage
            key={index}
            image={trial1.src}
            imageSide={index % 2 ? "left" : "right"}
            className="py-0"
          >
            <TextHeader
              colorHeader={item.title}
              size="small"
              alignHeader="left"
            />
            <TextParagraph paragraphs={item.paragraphs} medium />
          </ContentTextImage>
        ))}
      </ContentBlock>
    </Layout>
  );
};

export default AboutUs;

AboutUs.propTypes = {
  data: PropTypes.shape({
    image1: PropTypes.string.isRequired,
  }),
};

export async function getStaticProps() {
  // Replace with your actual image paths
  const data = {
    image1: "../images/about_us/trial1.png", // Ensure this is the correct public path
  };

  return {
    props: { data },
  };
}
