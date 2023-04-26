import { Link, Flex, Img, Stack, Text, HStack, Box, Icon, useBreakpointValue } from "@chakra-ui/react";
import { GetServerSideProps, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ShareLinks } from "../components/ShareLinks";
import { RichText } from 'prismic-dom'
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import DefaultErrorPage from 'next/error'
import { TextTag } from "../components/TextTag";
import { useEffect, useState } from "react";
import { ArrowDown, ChevronDown, ChevronsUp, ChevronUp } from "react-feather";
import { gql } from "@apollo/client";
import client from "@/services/apollo";

interface Post{
    slug: string;
    title: string;
    category: string;
    description: string;
    detach?: boolean;
    cover: string;
    content: string;
    updatedAt: string;
}

interface PostProps{
    post?: Post;
}

export default function Post({post} : PostProps){
    const isWideVersion = useBreakpointValue({base: false, lg: true,});
    const router = useRouter();
    //const postUrl = router.pathname;
    const [postUrl, setPostUrl] = useState('');
    const [topicsVisibility, setTopicsVisibility] = useState(false);

    useEffect(() => {
        if(isWideVersion){
            setTopicsVisibility(true);
        }
        setPostUrl(window.location.href);
    }, []);

    return !post ? (
        <>
            <Head>
                <meta name="robots" content="noindex" />
            </Head>
            <DefaultErrorPage statusCode={404} />
        </>
    ) 
    : (
        <>
            <Head>
                <title>{post.title} - Lance Consórcio</title>
            </Head>

            <Header whiteVersion={true} />

            <Flex w="100%" maxW="1200px" m="0 auto" px="8" py="32" flexDirection={["column","column","row"]} mb="8" align="flex-start" justifyContent="space-between">
                <Flex flexDir="column" w={["100%","100%","34%"]} position={["relative","relative","sticky"]} top={["0px","0px","50px"]}>
                    <Flex maxH="260px" overflow="hidden" mb="9" borderRadius="4px">
                        <Img src={post.cover} w="100%" h="fit-content" />
                    </Flex>

                    {/* <Text color="gray.400" fontSize="sm" fontWeight="regular" mb="12">React was introduced in May 2013. Its paradigm shift was that your UI was a function of your state.</Text>*/}
                    
                    <HStack alignItems="center" cursor="pointer" justifyContent="space-between" bg="white" mb="5" px="4" py="2" onClick={() => setTopicsVisibility(!topicsVisibility)}>
                        <TextTag>TÓPICOS</TextTag>

                        <Icon as={topicsVisibility ? ChevronUp : ChevronDown} stroke="#444" fontSize="16" fill="none" mr="2"/>
                    </HStack>

                    <ShareLinks url={postUrl} />
                    
                </Flex>

                <Flex flexDir="column" w={["100%","100%","58%"]}  borderLeft="1px solid" borderColor="gray.200" pl={["5","7","10"]}>
                    <Text fontSize={["4xl", "5xl","6xl"]} mb="6" fontWeight="bold">{post.title}</Text>

                    <HStack mb="20">
                        {/* <Text fontWeight="semibold" color="gray.600">
                            por
                        </Text> */}
                        {/* <Text fontWeight="semibold" color="white">
                            Mateus Berlitz
                        </Text> */}
                        <Text fontWeight="semibold" color="gray.600">
                            {post.updatedAt}
                        </Text>
                    </HStack>

                    <Box className="postContent" dangerouslySetInnerHTML={{__html: post.content}} />
                </Flex>
            </Flex>

            <Footer/>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({req, params }) => {
    try{
        const { data } = await client.query({
            query: gql`
                query Post($slug: String!) {
                    post(where: {slug: $slug}) {
                        createdAt
                        category
                        id
                        slug
                        title
                        description
                        detach
                        cover {
                            url
                        }
                        updatedAt
                    }
                }
            `,
            variables: {
                slug: params?.slug,
            },
        });
    
        const post = data.posts.map((post:any) => {
            return {
                slug: post.slug,
                title: post.title,
                cover: post.cover.url,
                category: post.category,
                description: post.description,
                updatedAt: post.updatedAt,
                detach: post.detach,
                // updatedAt: post.updatedAt ?  new Date(post.updatedAt).toLocaleDateString('pt-BR', {
                //     day: '2-digit',
                //     month: 'long',
                //     year: 'numeric'
                // }): ''
            }
        });
    
        //const { posts } = data;
    
        return {
            props: {
                post
            }
        }
    }catch(error: unknown){
        console.log(error);

        return {
            props: {}
        }
    }
}