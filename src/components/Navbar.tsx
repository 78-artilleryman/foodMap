import Link from 'next/link';
import React, { useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { useSession, signOut } from 'next-auth/react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, status } = useSession();
  console.log(data, status);
  return (
    <>
      <div className="navbar">
        <Link className="navbar__logo" href="/">
          FoodMap
        </Link>
        <div className="navbar__list">
          <Link className="navbar__list--item" href="/stores">
            맛집 목록
          </Link>
          <Link className="navbar__list--item" href="/stores/new">
            맛집 등록
          </Link>
          <Link className="navbar__list--item" href="/users/likes">
            찜한 가게
          </Link>
          {status === 'authenticated' ? (
            <button type="button" onClick={() => signOut()}>
              로그아웃
            </button>
          ) : (
            <Link className="navbar__list--item" href="/api/auth/signin">
              로그인
            </Link>
          )}
        </div>
        <div className="navbar__button" role="presentation" onClick={() => setIsOpen(val => !val)}>
          {isOpen ? <AiOutlineClose /> : <BiMenu />}
        </div>
      </div>
      {/* mobile navbar */}
      {isOpen && (
        <div className="navbar--mobile">
          <div className="navbar__list--mobile">
            <Link className="navbar__list--item--mobile" href="/stores">
              맛집 목록
            </Link>
            <Link className="navbar__list--item--mobile" href="/stores/new">
              맛집 등록
            </Link>
            <Link className="navbar__list--item--mobile" href="/users/likes">
              찜한 가게
            </Link>
            {status === 'authenticated' ? (
              <button type="button" onClick={() => signOut()}>
                로그아웃
              </button>
            ) : (
              <Link className="navbar__list--item" href="/api/auth/signin">
                로그인
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
