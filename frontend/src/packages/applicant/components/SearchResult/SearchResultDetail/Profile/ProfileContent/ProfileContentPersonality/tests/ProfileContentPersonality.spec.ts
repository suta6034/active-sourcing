import { mount } from '@vue/test-utils';
import {
    expect, it, render, screen,
} from '../../../../../../../../../../tests/drivers/vitest/utils';

import ProfileContentPersonality from '../ProfileContentPersonality.vue';

it('should render the content for the personality tab', async () => {
    render(ProfileContentPersonality);

    expect(await screen.findByTestId('ProfileContentPersonality')).toBeInTheDocument();
});

it('should render given texts for About me and Interests', async () => {
    const stubs = {
        ProfileContentEntry: {
            template: '<div class="ProfileContentEntry"><slot/></div>',
        },
    };
    const wrapper = mount(ProfileContentPersonality, {
        props: {
            interests: ['swimming', 'walking'],
            aboutMe: 'about me!',
        },
        global: {
            stubs,
        },
    });

    const aboutMeContainer = wrapper.find('.AboutMe');
    const interestsContainer = wrapper.find('.Interests');

    expect(aboutMeContainer.text()).toStrictEqual('about me!');
    expect(interestsContainer.text()).toStrictEqual('swimming, walking');
});
