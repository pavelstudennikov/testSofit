import {
    Button,
    Flex,
    Stack
} from '@chakra-ui/react'

export const Tools = ({ item, setItem, count, setVisibleMeta, visibleMeta }) => {

    const next = (value) => {
        if (item === 0 && value < 0 ) return
        if (item === 0 && value < 0 ) return

        setVisibleMeta(false)
        setItem(item + value)
    }

    return (
        <Stack spacing={2} direction={'row'}>
            <Button w="full"
                    disabled={item === 0 } colorScheme="red" variant="outline" onClick={() => next(-1)} >
                Предыдущий
            </Button>
            <Button w="full" colorScheme="red" variant="outline" onClick={() => {
                setVisibleMeta(!visibleMeta)
            }}>
                {visibleMeta ? 'Скрыть' : 'Показать мета'}
            </Button>
            <Button disabled={item === count - 1 }
                    w="full" colorScheme="green" variant="outline" onClick={() => next(1)}>
                Следующий
            </Button>
        </Stack>
    )
}
