/*
def rektangle(text, width=1, height=1):
    result = [' '.join(['{}'.format(i) for i in text])]
    for i in range(1, len(text) - 1):
        result.append(text[i] + ' ' * ((len(text) - 2)
                                       * 2 + 1) + text[len(text) - i - 1])
    result.append(' '.join(['{}'.format(i) for i in text[::-1]]))
    for _ in range(1, width):
        result = [line + line[-2:-2 * len(text):-1] for line in result]
    for _ in range(1, height):
        result.extend(result[-2:-len(text) - 1:-1])
    result = '\n'.join(result)
    return result.format(*list(text))
*/

/**
 * Example:
 * rektangle('rekt', 2, 2):
 *
 * r e k t k e r
 * e     k     e
 * k     e     k
 * t k e r e k t
 * k     e     k
 * e     k     e
 * r e k t k e r
 *
 * @param  {string} text
 * @param  {} width=1
 * @param  {} height=1
 * @returns string
 */
// function rektangle(text: string, width = 1, height = 1): string {
//     // TODO
//     return '';
// }
