import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MainButton } from "../Buttons/MainButton";

interface Post{
    slug: string;
    title: string;
    category: string;
    description: string;
    detach?: boolean;
    cover: string;
    updatedAt: string;
}

interface MainPostsProps{
    posts: Post[];
}

export default function MainPosts({posts}: MainPostsProps){
    const router = useRouter();
    const [activePost, setActivePost] = useState(posts[0]);
    const [activePostIndex, setActivePostIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            console.log(activePostIndex);
            if(activePostIndex + 1 === posts.length){
                setActivePost(posts[0]);
                setActivePostIndex(0);
            }else{
                setActivePost(posts[activePostIndex + 1]);
                setActivePostIndex(activePostIndex + 1);
            }
        }, 6000);

        return () => clearInterval(interval);

      }, [activePostIndex]);

      const changeActivePost = (index:number) => {
        setActivePost(posts[index]);
        setActivePostIndex(index);
      }

      //console.log(activePost);

    return(
        <Stack bg={`url(${activePost.cover})`} backgroundSize="cover" backgroundPosition="0 0px" color="white" transition="all ease 0.4s">
            <Stack bg="linear-gradient(3.06deg, rgba(45, 50, 80, 0.43) -20.72%, #181818 93.12%)" p="8" pos="relative">
                <Flex w="100%" textAlign={"center"} justifyContent="center">
                    <Text fontSize={"lg"} textTransform="uppercase" fontWeight={"medium"}>Principais artigos</Text>
                </Flex>

                <Stack p="12" spacing="8" maxW="500px">
                    <Text transition="all ease 0.4s" fontWeight="light" fontSize="md" color="gray.200" textTransform={"uppercase"}>{activePost.category}</Text>

                    <Text transition="all ease 0.4s" fontSize="4xl" fontWeight={"medium"} lineHeight="1.2em">{activePost.title}</Text>

                    <Text transition="all ease 0.4s" fontSize="md" fontWeight={"light"} lineHeight="">{activePost.description}</Text>

                    <MainButton w="200px" onClick={() => {activePost.slug && router.push(activePost.slug)}}>
                        Continuar Lendo
                    </MainButton>
                </Stack>

                <Stack pos="absolute" right="0" top="0" bottom="0" alignItems={"end"} justifyContent="center" spacing="6">
                    {
                        posts.map((post:Post, index: number) => {
                            //console.log(index, activePostIndex);
                            return(
                                <HStack onClick={() => changeActivePost(index)} p="2" cursor={"pointer"}>
                                    <Text>0{index + 1}</Text>
                                    <Box transition="all ease 0.4s" w={activePostIndex === index ? "120px" : "80px"} h="1px" bg="linear-gradient(90.27deg, #FFFFFF 24.43%, rgba(255, 255, 255, 0) 119.68%);"/>
                                </HStack>
                            )
                        })
                    }
                    {/* <HStack>
                        <Text>01</Text>
                        <Box w="120px" h="1px" bg="linear-gradient(90.27deg, #FFFFFF 24.43%, rgba(255, 255, 255, 0) 119.68%);"/>
                    </HStack>
                    <HStack>
                        <Text>02</Text>
                        <Box w="80px" h="1px" bg="linear-gradient(90.27deg, #FFFFFF 24.43%, rgba(255, 255, 255, 0) 119.68%);"/>
                    </HStack>
                    <HStack>
                        <Text>03</Text>
                        <Box w="80px" h="1px" bg="linear-gradient(90.27deg, #FFFFFF 24.43%, rgba(255, 255, 255, 0) 119.68%);"/>
                    </HStack>
                    <HStack>
                        <Text>04</Text>
                        <Box w="80px" h="1px" bg="linear-gradient(90.27deg, #FFFFFF 24.43%, rgba(255, 255, 255, 0) 119.68%);"/>
                    </HStack>
                    <HStack>
                        <Text>05</Text>
                        <Box w="80px" h="1px" bg="linear-gradient(90.27deg, #FFFFFF 24.43%, rgba(255, 255, 255, 0) 119.68%);"/>
                    </HStack> */}
                </Stack>
            </Stack>
        </Stack>
    )
}