import { Box, Flex, Grid, Heading, HStack, Img, Stack, Text } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { Card } from "../components/Card";
import { Header } from "../components/Header";
import { TextTag } from "../components/TextTag";
import Head from "next/head";
import { gql } from '@apollo/client';
import client from "@/services/apollo";
import Link from "next/link";
import { MainButton } from "@/components/Buttons/MainButton";
import MainPosts from "@/components/MainPosts";
import { useEffect, useState } from "react";
import { ChevronRight } from "react-feather";

interface Post{
    slug: string;
    title: string;
    category: string;
    description: string;
    detach?: boolean;
    cover: string;
    updatedAt: string;
}

interface BlogProps{
    posts: Post[];
}

export default function Blog({posts}: BlogProps){

    const getDetachPosts = () => {
        const newDetachPosts = posts.filter((post) => {post.detach === true}).slice(0,5);

        if(newDetachPosts.length === 0){
            return posts.slice(0,5);
        }

        return newDetachPosts;
    }

    const [detachPosts, setDetachPosts] = useState<Post[]>(() => {
        return getDetachPosts();
    });

    useEffect(() => {
        setDetachPosts(getDetachPosts());
    }, [posts])

    console.log(posts);
    
    return(
        <Box position="relative">
            <Head>
                <title>Blog - S&S Investimentos</title>

                <meta name="description" content="Cresça no seu conhecimento financeiro junto conosco."></meta>
            </Head>

            <Header whiteVersion={true} />

            <Flex flexDir="column" w="100%" px="6">
                <Stack flexDir="column" w="100%" maxW="1200px" m="0 auto" py="36" pt="16" spacing="20" justifyContent="space-between">
                    <Stack spacing="5">
                        <HStack fontSize={"md"}>
                            <Link href="/"><Text _hover={{textDecor:"underline"}} color="rgba(67, 67, 67, 0.5)">Home</Text></Link>
                            <Text><ChevronRight color="rgba(67, 67, 67, 0.5)"/></Text>
                            <Text>Blog</Text>
                        </HStack>
                        <Heading fontSize={["4xl", "5xl", "6xl"]}>Blog SS Investimentos</Heading>
                        <Text>Compartilhamos com você conteúdo e informações para auxiliar o seu conhecimento.</Text>
                    </Stack>

                    <MainPosts posts={detachPosts}/>
                    
                    <Stack w="100%" textAlign={"center"}>
                        <Text fontSize={"lg"} textTransform="uppercase" fontWeight={"medium"}>Você também pode se interessar</Text>
                    </Stack>

                    <Grid templateColumns="repeat(3, 1fr)" gap={12}>

                        {
                            posts.map(post => (
                                // <Post key={post.slug} slug={post.slug} image={post.image} title={post.title} date={post.updatedAt} time={post.time}/>
                                <Card key={post.slug} hasButton={false} gridColumn={["span 3", "span 3", `span 1`]}  title={post.title} category={post.category} description={post.description} text="" imgUrl={post.cover} href={post.slug}/>
                            ))
                        }
                        
                        {/* <Card gridColumn={["span 3", "span 3", "span 1"]} bg="white" title="Investimento" text="Adquira o seu plano para aquisição de imóvel, veículo ou investimento." imgUrl="/images/money.png" href="investimento"/>

                        <Card gridColumn={["span 3", "span 3", "span 1"]} bg="white" title="Investimento" text="Adquira o seu plano para aquisição de imóvel, veículo ou investimento." imgUrl="/images/house.png" href="investimento"/>
                        
                        <Card gridColumn={["span 3", "span 3", "span 1"]} bg="white" title="Investimento" text="Adquira o seu plano para aquisição de imóvel, veículo ou investimento." imgUrl="/images/money.png" href="investimento"/>

                        <Card gridColumn={["span 3", "span 3", "span 2"]} bg="white" title="Investimento" text="Adquira o seu plano para aquisição de imóvel, veículo ou investimento." imgUrl="/images/car.png" href="investimento"/>

                        <Card gridColumn={["span 3", "span 3", "span 1"]} bg="white" title="Investimento" text="Adquira o seu plano para aquisição de imóvel, veículo ou investimento." imgUrl="/images/moneyTest.png" href="investimento"/>
                    
                        <Card gridColumn={["span 3", "span 3", "span 2"]} flexDir="row" bg="white" title="Investimento" text="Adquira o seu plano para aquisição de imóvel, veículo ou investimento." imgUrl="/images/moneyTest.png" href="investimento"/>
                     */}
                    </Grid>
                </Stack>
            </Flex>
        </Box>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const { data } = await client.query({
        query: gql`
            query Posts {
                posts {
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
        `
    })

    const posts = data.posts.map((post:any) => {
        return {
            id: post.id,
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
            posts
        },
    }
}