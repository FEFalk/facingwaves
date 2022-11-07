import Link from 'next/link';

import useSite from 'hooks/use-site';
import { postPathBySlug } from 'lib/posts';
import { categoryPathBySlug } from 'lib/categories';
import { findMenuByLocation, MENU_LOCATION_NAVIGATION_DEFAULT } from 'lib/menus';

import Section from 'components/Section';
import Container from 'components/Container';
import NavListItem from 'components/NavListItem';

import styles from './Footer.module.scss';

const Footer = () => {
  const { metadata = {}, recentPosts = [], categories = [], menus } = useSite();
  const { title } = metadata;

  const hasRecentPosts = Array.isArray(recentPosts) && recentPosts.length > 0;
  const hasRecentCategories = Array.isArray(categories) && categories.length > 0;
  const hasMenu = hasRecentPosts || hasRecentCategories;

  const navigation = findMenuByLocation(menus, [
    process.env.WORDPRESS_MENU_LOCATION_NAVIGATION,
    MENU_LOCATION_NAVIGATION_DEFAULT,
  ]);

  return (
    <footer className={styles.footer}>
      <Section className={styles.footerLegal}>
        <Container>
          <ul className={styles.footerMenuColumns}>
              {navigation?.map((listItem) => {
                return <NavListItem key={listItem.id} className={styles.navSubMenu} item={listItem} />;
              })}
          </ul>
          <p>
            &copy; {new Date().getFullYear()} {title}
          </p>
        </Container>
      </Section>
    </footer>
  );
};

export default Footer;
