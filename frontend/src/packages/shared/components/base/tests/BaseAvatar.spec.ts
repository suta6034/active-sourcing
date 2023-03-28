import { mount } from '@vue/test-utils';
import {
    expect,
    it,
    describe,
} from '../../../../../../tests/drivers/vitest/utils';
import BaseAvatar from '../BaseAvatar.vue';

describe.each([
    [false, undefined, undefined],
    [true, undefined, undefined],
    [false, 20, undefined],
    [false, undefined, 30],
    [false, 20, 30],
    [true, 20, undefined],
    [true, undefined, 30],
    [true, 20, 30],
])('BaseAvatar', (isPending, width, height) => {
    it(`should render the BaseAvatar where isPending is '${isPending}',
     width is '${width}' and height is '${height}'`, () => {
        const wrapper = mount(BaseAvatar, {
            props: {
                isPending,
                width,
                height,
            },
        });
        const svg = wrapper.find('svg');
        expect(svg.exists()).toBe(true);
        expect(svg.element.getAttribute('data-testid')).toStrictEqual(
            isPending ? 'profile pending avatar' : 'profile locked avatar',
        );
        expect(svg.element.getAttribute('width')).toStrictEqual(width != null ? `${width}` : '53');
        expect(svg.element.getAttribute('height')).toStrictEqual(height != null ? `${height}` : '53');
    });
});
