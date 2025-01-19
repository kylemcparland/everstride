# Everstride - A Fitness RPG

Everstride is a gamified fitness application built with Next.js that motivates users to achieve their step goals through DnD-inspired quests. By integrating the Strava API, the app translates daily steps into progress on an adventure map, where users can embark on dynamic quests to earn gold and customize their in-game Avatar with new equipment. Everstride's social features also allow users to add their friends and track their progress - all without distrupting their own. Additionally, the Stripe API lets users skip the run and make secure payments to purchase gold directly.

## Features

- **Quest-based Progression:** Users are always on a quest, where they progress based on daily and weekly step goals.
- **StepVisualizer:** At the center of the app is the StepVisualizer, which translates daily step counts into the avatar's position on the X-axis. The goal is to reach the star at the end of the quest.
- **Gamified Decisions:** After completing a quest, users face random D&D-style events with interactive choices. Rolling a dice may reward users with gold, adding an element of chance and excitement.
- **Real-time Updates:** Track step progress through the Strava API, with updates displayed dynamically on the quest map.
- **Manual Step Input:** For users without Strava, manual step input ensures everyone can participate and enjoy the app.
- **Social Connectivity:** Add friends to see their progress, maintain motivation, and foster friendly competition.
- **Avatar Customization:** Personalize your adventure by editing your avatar through the Avatar Editor.
- **Gold Economy:** Earn gold from quests and spend it in the Gold Market to unlock new equipment.
- **Payment Integration:** Use Stripe to purchase gold directly with secure payments.

## Final Product

_No Strava APP? No problem! Manually add your steps to progress on your quest!_
!["Adding progress to StepVisualizer"](https://raw.githubusercontent.com/kylemcparland/everstride/refs/heads/main/media/1E-add-progress.gif "Adding progress to StepVisualizer")

_With your Strava account connected, there is no need for manual updates - just visit the page and see how far you've reached in your quest!_
!["Strava API implementation"](https://raw.githubusercontent.com/kylemcparland/everstride/refs/heads/main/media/8E-strava.png "Strava API implementation")

_Customize your avatar to stand out from your friends!_
!["Avatar editor menu"](https://raw.githubusercontent.com/kylemcparland/everstride/refs/heads/main/media/2E-avatar.png "Avatar editor menu")

_Completing a quest leads to a choice - and the roll of a dice! Make your choice wisely!_
!["Completing a quest"](https://raw.githubusercontent.com/kylemcparland/everstride/refs/heads/main/media/3E-complete-quest.gif "Completing a quest")

_The world map shows your meta-progression across all quests. Progress on the world map to update your StepVisualizer's backdrop!_
!["World map display"](https://raw.githubusercontent.com/kylemcparland/everstride/refs/heads/main/media/4E-map.png "World map display")

_Add friends to motivate each other to reach your goals. No scrolling required - the page will change dynamically!_
!["Adding a friend"](https://raw.githubusercontent.com/kylemcparland/everstride/refs/heads/main/media/5E-add-friend.gif "Adding a friend")

_Purchase new equipment using gold earned from quests!_
!["Store menu"](https://raw.githubusercontent.com/kylemcparland/everstride/refs/heads/main/media/6E-store.png "Store menu")

_Or make a secure payment with Stripe to earn gold the old fashioned way!_
!["Using the Stripe API"](https://raw.githubusercontent.com/kylemcparland/everstride/refs/heads/main/media/7E-stripe.png "Using the Stripe API")

## Dependencies

### Development:

- Next.js ^13.5.7
- React ^18.2.0
- Stripe ^17.5.0
- React-Stripe--js ^3.1.1
- Stripe-js ^5.4.0
- PostgreSQL ^14.x

## Bugs and Issues

If you encounter any bugs or have suggestions for improvement, please feel free to open an issue on [GitHub](https://github.com/kylemcparland/everstride/issues).

---

#### Thank you for checking out Everstride!
