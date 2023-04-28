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
import { ArrowDown, ChevronDown, ChevronRight, ChevronsUp, ChevronUp } from "react-feather";
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

    console.log(post)

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
                <title>{post.title} - SS Investimentos</title>
            </Head>

            <Header whiteVersion={true} />

            <Flex w="100%" maxW="900px" m="0 auto" px="8" py="32" flexDirection={["column","column"]} mb="8" pt="16" align="flex-start" justifyContent="space-between">
                <Stack spacing="12">
                    <HStack fontSize={"md"}>
                        <Link href="/"><Text _hover={{textDecor:"underline"}} color="rgba(67, 67, 67, 0.5)">Home</Text></Link>
                        <Text><ChevronRight color="rgba(67, 67, 67, 0.5)"/></Text>
                        <Text>Blog</Text>
                    </HStack>

                    <Flex overflow="hidden" mb="9" borderRadius="4px">
                        <Img src={post.cover} w="100%" h="fit-content" />
                    </Flex>

                    <Text textTransform={"uppercase"} color="blue.primary" borderBottom="1px solid" width="fit-content">{post.category}</Text>

                    <Text fontSize={["4xl", "5xl","6xl"]} mb="6" fontWeight="medium" color="blue.primary" lineHeight={"1.1em"}>{post.title}</Text>

                    <Box className="postContent" dangerouslySetInnerHTML={{__html: post.content}} />

                    <Text color="blue.primary" opacity="0.6">Publicado em {post.updatedAt}</Text>

                    <ShareLinks url={postUrl} />
                </Stack>
            </Flex>

            <Footer/>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({req, params }) => {
    if(params){
        const { slug } = params;

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
                            content {
                                html
                            }
                            updatedAt
                        }
                    }
                `,
                variables: {
                    slug: slug,
                },
            })

            //console.log(data);

            const { post } = data;

            if(post){
                const formattedPost = {
                    //slug: post.slug,
                    title: post.title,
                    cover: post.cover.url,
                    category: post.category,
                    description: post.description,
                    detach: post.detach,
                    content: post.content[0].html,
                    updatedAt: post.updatedAt ?  new Date(post.updatedAt).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                    }): ''
                }
            
                return {
                    props: {
                        post: formattedPost
                    }
                }
            }
        }catch(error: unknown){
            console.log(error);
    
            return {
                props: {}
            }
        }
    }

    return {
        props: {}
    }
}